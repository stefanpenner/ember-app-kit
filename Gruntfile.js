module.exports = function(grunt) {
  // To support Coffeescript, SASS, LESS and others, just install
  // the appropriate grunt package and it will be automatically included
  // in the build process:
  //
  // * for Coffeescript, run `npm install --save-dev grunt-contrib-coffee`
  //
  // * for SASS (SCSS only), run `npm install --save-dev grunt-sass`
  // * for SCSS/SASS support (may be slower), run
  //   `npm install --save-dev grunt-contrib-sass`
  //   This depends on the ruby sass gem, which can be installed with
  //   `gem install sass`
  //
  // * for LESS, run `npm install --save-dev grunt-contrib-less`
  //
  // * for Stylus/Nib, `npm install --save-dev grunt-contrib-stylus`
  //
  // * for Compass, run `npm install --save-dev grunt-contrib-compass`
  //   This depends on the ruby compass gem, which can be installed with
  //   `gem install compass`
  //   You should not install SASS if you have installed Compass.
  //
  // * for Emblem, run the following commands:
  //   `npm uninstall --save-dev grunt-ember-templates`
  //   `npm install --save-dev grunt-emblem`
  //   `bower install emblem.js --save`
  //
  // * for LiveReload, `npm install --save-dev connect-livereload`
  //
  // * for displaying the execution time of the various grunt tasks,
  //   `npm install --save-dev time-grunt`
  //
  // * for using the loom generator to generate routes, controllers, etc.
  //   efficiently. `npm install --save-dev loom loom-generators-ember`
  //
  // If you use SASS, LESS or Stylus, don't forget to delete
  // `public/assets/app.css` and create `app/styles/app.scss` instead.

  var Helpers = require('./tasks/helpers'),
      filterAvailable = Helpers.filterAvailableTasks,
      _ = grunt.util._;

  Helpers.pkg = require("./package.json");

  if (Helpers.isPackageAvailable("time-grunt")) {
    require("time-grunt")(grunt);
  }

  // Loads task options from `tasks/options/`
  // and loads tasks defined in `package.json`
  var config = require('load-grunt-config')(grunt, {
    configPath: "tasks/options",
    init: false
  });
  grunt.loadTasks('tasks'); // Loads tasks in `tasks/` folder

  config.env = process.env;

  


  // App Kit's Main Tasks
  // ====================


  // Generate the production version
  // ------------------
  grunt.registerTask('dist', "Build a minified & production-ready version of your app.", [
                     'clean:dist', 'build:dist', 'copy:assemble', 'optimize' ]);


  // Default Task
  // ------------------
  grunt.registerTask('default', "Build (in debug mode) & test your application.", ['test']);


  // Servers
  // -------------------
  grunt.registerTask('server', "Run your server in development mode, auto-rebuilding when files change.", [
                     'clean:debug',
                     'build:debug',
                     'expressServer:debug',
                     'watch'
                     ]);

  grunt.registerTask('server:dist', "Build and preview a minified & production-ready version of your app.", [
                     'dist',
                     'expressServer:dist:keepalive'
                     ]);


  // Testing
  // -------
  grunt.registerTask('test', "Run your apps's tests once. Uses Google Chrome by default. Logs coverage output to tmp/public/coverage.", [
                     'clean:debug', 'build:debug', 'copy:assemble', 'karma:test' ]);

  grunt.registerTask('test:ci', "Run your app's tests in PhantomJS. For use in continuous integration (i.e. Travis CI).", [
                     'clean:debug', 'build:debug', 'copy:assemble', 'karma:ci' ]);

  grunt.registerTask('test:browsers', "Run your app's tests in multiple browsers (see tasks/options/karma.js for configuration).", [
                     'clean:debug', 'build:debug', 'copy:assemble', 'karma:browsers' ]);

  grunt.registerTask('test:server', "Start a Karma test server and the standard development server.", [
                     'clean:debug',
                     'build:debug',
                     'karma:server',
                     'expressServer:debug',
                     'addKarmaToWatchTask',
                     'watch'
                     ]);

  // Worker tasks
  // =================================

  grunt.registerTask('build:dist', [
                     'concurrent:dist', // Tasks are ran in parallel, see config below
                     ]);

  grunt.registerTask('build:debug', [
                     'concurrent:debug', // Tasks are ran in parallel, see config below
                     ]);

  grunt.registerTask('optimize', [
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'copy:dist',
                     'rev',
                     'usemin'
  ]);



  // Parallelize most of the build process
  _.merge(config, {
    concurrent: {
      dist: [
        "buildTemplates:dist",
        "buildScripts",
        "buildStyles",
        "buildIndexHTML:dist"
      ],
      debug: [
        "buildTemplates:debug",
        "buildScripts",
        "buildStyles",
        "buildIndexHTML:debug"
      ]
    }
  });

  // Templates
  grunt.registerTask('buildTemplates:dist', filterAvailable([
                     'emblem:compile',
                     'emberTemplates:dist'
                     ]));

  grunt.registerTask('buildTemplates:debug', filterAvailable([
                     'emblem:compile',
                     'emberTemplates:debug'
                     ]));

  // Scripts
  grunt.registerTask('buildScripts', filterAvailable([
                     'coffee',
                     'copy:javascriptToTmp',
                     'transpile',
                     'jshint',
                     'concat_sourcemap'
                     ]));

  // Styles
  grunt.registerTask('buildStyles', filterAvailable([
                     'compass:compile',
                     'sass:compile',
                     'less:compile',
                     'stylus:compile',
                     'cssmin'
                     ]));

  // Index HTML
  grunt.registerTask('buildIndexHTML:dist', [
                     'preprocess:indexHTMLDistApp',
                     'preprocess:indexHTMLDistTests'
                     ]);

  grunt.registerTask('buildIndexHTML:debug', [
                     'preprocess:indexHTMLDebugApp',
                     'preprocess:indexHTMLDebugTests'
                     ]);

  // Configure watch task
  grunt.registerTask('addKarmaToWatchTask', function() {
    // Append `karma:server:run` to every watch target's tasks array
    _.forIn(grunt.config('watch'), function(config, key) {
      if (key === 'options') { return; }
      config.tasks.push('karma:server:run');
      grunt.config('watch.' + key, config);
    });
  });


  grunt.initConfig(config);

  
};
