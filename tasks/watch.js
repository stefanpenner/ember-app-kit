var grunt = require('grunt'),
    _ = grunt.util._,
    Helpers = require('./helpers'),
    fs = require('fs'),
    Watch = {};

Watch._debugFlag = false;

// @see #Watch.subscribeToFileModificationEvents
Watch.subscribeTasksToFileModificationEvents = function(tasks){
  tasks.forEach(Watch.subscribeToFileModificationEvents);
  return tasks;
}

// Subscribing task to file modifications events means that every
// time a relevant file changes, that task will be run. (Relevant
// file is a file amongst source (src) files for that task.)
// 
// If a file is deleted, the destination (dest) for the task will be
// automatically removed before the task is executed.
// 
// Futhermore, if you set `task.options.shouldFilterModifiedFile`
// to true, the scope of the task will be narrowed down only 
// to the modified file (with grunt filter function).
// 
// Initial file modifications events are fired by grunt-contrib-watch.
// Succeeding events are fired after a particular task modifies its
// destination path. This results in reactive chaining of tasks
// inferred from their source / destination paths.
Watch.subscribeToFileModificationEvents = function(task){
  var taskDesc;
  if (Helpers.config.shouldCompileIncrementally) { 
    taskDesc = Watch.taskAndTargetsFromFullTaskName(task);

    taskDesc.targets.forEach(function(target){
      // If we memoized the files later (lazily), we would not be able 
      // to retrieve information about deleted files
      Watch.memoizeFilesForTask(taskDesc.name, target);

      grunt.event.on('watch', function(action, changedFile){
        Watch.runFilteredTask(taskDesc.name, target, action, changedFile);
      });
    });
  };
};

grunt.registerTask('file_did_change', function(){
  var event, eventQueue;
  eventQueue = grunt.config('file_did_change.options.eventQueue');

  // Clear the event queue
  grunt.config('file_did_change.options.eventQueue', []);
  Watch.fileDidChangeTaskIsScheduled = false;

  if (Watch._debugFlag) {
    grunt.log.writeln("Emitting:");
    grunt.log.writeln(eventQueue);
  }
  eventQueue.forEach(function(event){
    // Note that event.action is the original action at the start of the event
    // loop. We have problably no way of knowing if the event.filepath 
    // is created, changed or deleted (by the previous task).
    map = {
      deleted: 'changed or deleted',
      added: 'changed or created',
      changed: 'changed'
    }
    grunt.log.write('File "' + event.filepath + '" ' + map[event.action] + '.');
    grunt.event.emit('watch', event.action, event.filepath);
  });
  grunt.log.writeln()
});

// @param task task subscribed to file change events
Watch.runFilteredTask = function(task, target, action, filepath){
  var source, destination, file, shouldFilterPath;

  file = Watch.doesTaskWatchFilepath(filepath, action, task, target);
  if (Watch._debugFlag) {
    grunt.log.writeln("Receiving " + [task, target, filepath, file].join(' '));
  }
  if (!file) { return; }
  source = filepath;
  destination = file.dest

  // Straight up delete the destination file for this task
  if (action == 'deleted'){
    Watch.deleteFile(destination);
  }
  // Set filter to narrow down task's files to the modified file
  shouldFilterPath = [task, 'options', 'shouldFilterModifiedFile']
  if (grunt.config(shouldFilterPath)) {
    Watch.setFilterForTask(task, target, Watch.filterModifiedFile(source));
  }
  // Queue up this task
  grunt.task.run(task + ":" + target);

  // Only after this task is done, reemit the file change event 
  // with new destination
  Watch.runFileDidChangeTask(action, destination);
};

// Runs 'file_did_change' task
Watch.runFileDidChangeTask = function(action, changedFile){
  if (!changedFile) { return; }
  var events = grunt.config('file_did_change.options.eventQueue');

  events = events ? events : [];
  events.push({ action: action, filepath: changedFile });
  grunt.config('file_did_change.options.eventQueue', events);

  if (!Watch.fileDidChangeTaskIsScheduled){;
    Watch.fileDidChangeTaskIsScheduled = true;
    grunt.task.run('file_did_change');
  }
}

Watch.deleteFile = function(path){
  if (path && fs.existsSync(path)){
    fs.unlinkSync(path);
  };
};

// Sets given filter function for the task config
Watch.setFilterForTask = function(task, target, filter){
  var config = Watch.filteredConfigForTask(task, target, filter);
  grunt.config([task, target], config);
};

// @returns task config with set filter function. Doesn't modify the original 
// grunt config.
// @see https://github.com/gruntjs/grunt/wiki/Configuring-tasks for a list
// of supported configuration formats
Watch.filteredConfigForTask = function(task, target, filter){
  var config, files;
  config = grunt.config([task, target]);

  if (config.files && config.files instanceof Array) {
    config.files = config.files.map(function(object){
      object.filter = filter;
      return object;
    });

  } else if (config.files) {
    config.files.filter = filter;

  } else {
    config.filter = filter;
  }
  return config;
};

// Generator for function to be plugged into 'filter' option in task 
// config to filter out unmodified files
// @see https://github.com/gruntjs/grunt/wiki/Configuring-tasks#files
Watch.filterModifiedFile = function(modifiedFile){
  return function(filepath){ 
    if (Helpers.config.shouldCompileIncrementally) {
      return modifiedFile === filepath;
    } else {
      return true;
    };
  };
};

// @example 
// ```
// Watch.taskAndTargetsFromFullTaskName("clean:build");
// //~> { name: 'clean', targets: ['build'] }
// Watch.taskAndTargetsFromFullTaskName("clean");
// //~> { name: 'clean', targets: ['build', 'release'] }
// ```
Watch.taskAndTargetsFromFullTaskName = function(args){
  var task;
  args = args.split(":");
  targets = args[1] ? [args[1]] : Helpers.getTargetsForTask(args[0]);
  return { name: args[0], targets: targets };
};

// @see Watch.memoizeFilesForTask
Watch._filesForTasks = {}

// @see grunt docs for `grunt.task.normalizeMultiTaskFiles`
// Following Grunt nomenclature, 'files' are `{ src: Array, dest: String }` 
// objects, not filepaths.
Watch.memoizeFilesForTask = function(task, target){
  var config, files, identifier = task + ":" + target;
  // Remove filter from task config to memoize the full spectrum of files
  config = Watch.filteredConfigForTask(task, target, undefined);
  files = grunt.task.normalizeMultiTaskFiles(config);
  Watch._filesForTasks[identifier] = files;
  return files;
}

// @returns {{ src: Array, dest: String }} file description
// @see Watch#memoizeFilesForTask
// @see grunt docs for `grunt.task.normalizeMultiTaskFiles`
Watch.doesTaskWatchFilepath = function(filepath, action, task, target){
  var files, file;
  files = Watch._filesForTasks[task + ":" + target];
  // If a new file is created, it's not yet included in the memoized 
  // 'files' and we'll have to recompute them again.
  if (!files || action == 'added') {
    files = Watch.memoizeFilesForTask(task, target);
  }
  return _.find(files, function(file){ 
    return _.contains(file.src, filepath);
  });
};

module.exports = Watch;