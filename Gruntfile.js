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
  // If you use SASS, LESS or Stylus, don't forget to delete
  // `public/assets/app.css` and create `app/styles/app.scss` instead.

  var Helpers = require('./tasks/helpers'),
      filterAvailable = Helpers.filterAvailableTasks;

  Helpers.pkg = require("./package.json");

  var config = require('load-grunt-config')(grunt, {
    configPath: "tasks/options",
    init: false
  });
  grunt.loadTasks('tasks');

  config.env = process.env;

  


  // App Kit's Main Tasks
  // ====================

  // Default Task
  // ------------------
  grunt.registerTask('default', "Build (in debug mode) & test your application.", ['test']);


  // Building
  // --------
  grunt.registerTask('build:dist', "Build a minified & production-ready version of your app.", [
                     'clean:build',
                     'clean:release',
                     'copy:stage',
                     'lock',
                     'concurrent:dist', // Main phase, see config below
                     'unlock',
                     'dom_munger:distEmber',
                     'dom_munger:distHandlebars',
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'copy:dist',
                     'rev',
                     'usemin'
                     ]);

  grunt.registerTask('build:debug', "Build a development-friendly version of your app.", [
                     'clean:build',
                     'copy:stage',
                     'lock',
                     'concurrent:debug', // Main phase, see config below
                     'unlock'
                     ]);

  // Testing
  // -------
  grunt.registerTask('test', "Run your apps's tests once. Uses Google Chrome by default. Logs coverage output to tmp/public/coverage.", [
                     'build:debug', 'karma:test' ]);

  grunt.registerTask('test:ci', "Run your app's tests in PhantomJS. For use in continuous integration (i.e. Travis CI).", [
                     'build:debug', 'karma:ci' ]);

  grunt.registerTask('test:browsers', "Run your app's tests in multiple browsers (see tasks/options/karma.js for configuration).", [
                     'build:debug', 'karma:browsers' ]);

  grunt.registerTask('test:server', "Start a Karma test server. Automatically reruns your tests when files change and logs the results to the terminal.", [
                     'build:debug',
                     'karma:server',
                     'connect:server',
                     'watch'
                     ]);

  // Development Servers
  // -------------------
  grunt.registerTask('server', "Run your server in development mode, auto-rebuilding when files change.", [
                     'build:debug',
                     'connect:server',
                     'watch'
                     ]);

  grunt.registerTask('server:dist', "Build and preview production (minified) assets.", [
                     'build:dist',
                     'connect:dist:keepalive'
                     ]);



  // Inner workings of the build tasks
  // =================================

  // Parallelize most of the build process
  config.concurrent = {
    dist: [
      "buildTemplates:dist",
      "buildScripts",
      "buildStyles",
      "buildOther"
    ],
    debug: [
      "buildTemplates:debug",
      "buildScripts",
      "buildStyles",
      "buildOther"
    ]
  };

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
                     'copy:prepare',
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

  // Other
  grunt.registerTask('buildOther', filterAvailable([
                     'copy:vendor'
                     ]));





  grunt.initConfig(config);
};
