// Use these tasks to bootstrap various eak project skeletons

module.exports = function (grunt) {

  grunt.registerTask('project:new', 'Project bootstrap tasks', function () {
    grunt.file.mkdir('app/');
  });

  grunt.registerTask('project:empty', "Empty Ember App Folder", [
                     'project:new',
                     'copy:projectEmpty'
                     ]);

  grunt.registerTask('project:minimum', "Minimum Ember Project", [
                     'project:new',
                     'copy:projectMinimum'
                     ]);

  // Note: startkit depends on project:minimum being created first
  // TODO: configure better dependency management between project types
  grunt.registerTask('project:starterkit', "Minimum Ember Project", [
                     'project:new',
                     'copy:projectMinimum',
                     'copy:projectStarterKit'
                     ]);

};
