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

  grunt.registerTask('default', "Build (in debug mode) & test your application.", ['test']);

  config.concurrent = {
    dist: [
      "build:templates:dist",
      "build:scripts",
      "build:styles",
      "build:other"
    ],
    debug: [
      "build:templates:debug",
      "build:scripts",
      "build:styles",
      "build:other"
    ]
  };

  // All tasks except build:before and build:after are run concurrently
  grunt.registerTask('build:before:dist', [
                     'clean:build',
                     'clean:release',
                     'copy:stage',
                     'lock'
                     ]);

  grunt.registerTask('build:before:debug', [
                     'clean:build',
                     'copy:stage',
                     'lock'
                     ]);

  grunt.registerTask('build:templates:dist', filterAvailable([
                     'emblem:compile',
                     'emberTemplates:dist'
                     ]));

  grunt.registerTask('build:templates:debug', filterAvailable([
                     'emblem:compile',
                     'emberTemplates:debug'
                     ]));

  grunt.registerTask('build:scripts', filterAvailable([
                     'coffee',
                     'copy:prepare',
                     'transpile',
                     'jshint',
                     'concat_sourcemap'
                     ]));

  grunt.registerTask('build:styles', filterAvailable([
                     'compass:compile',
                     'sass:compile',
                     'less:compile',
                     'stylus:compile',
                     'cssmin'
                     ]));

  grunt.registerTask('build:other', filterAvailable([
                     'copy:vendor'
                     ]));

  grunt.registerTask('build:after:dist', filterAvailable([
                     'unlock',
                     'dom_munger:distEmber',
                     'dom_munger:distHandlebars',
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'copy:dist',
                     'rev',
                     'usemin'
                     ]));

  grunt.registerTask('build:after:debug', filterAvailable([
                     'unlock'
                     ]));

  grunt.registerTask('build:dist', "Build a minified & production-ready version of your app.", [
                     'build:before:dist',
                     'concurrent:dist',
                     'build:after:dist'
                     ]);

  grunt.registerTask('build:debug', "Build a development-friendly version of your app.", [
                     'build:before:debug',
                     'concurrent:debug',
                     'build:after:debug'
                     ]);

  grunt.registerTask('test', "Run your apps's tests once. Uses Google Chrome by default. Logs coverage output to tmp/public/coverage.", [
                     'build:debug', 'karma:test' ]);

  grunt.registerTask('test:ci', "Run your app's tests in PhantomJS. For use in continuous integration (i.e. Travis CI).", [
                     'build:debug', 'karma:ci' ]);

  grunt.registerTask('test:browsers', "Run your app's tests in multiple browsers (see tasks/options/karma.js for configuration).", [
                     'build:debug', 'karma:browsers' ]);

  grunt.registerTask('test:server', "Start a Karma test server. Automatically reruns your tests when files change and logs the results to the terminal.", [
                     'build:debug', 'karma:server', 'connect:server', 'watch:test']);

  grunt.registerTask('server', "Run your server in development mode, auto-rebuilding when files change.",
                     ['build:debug', 'connect:server', 'watch:main']);
  grunt.registerTask('server:dist', "Build and preview production (minified) assets.",
                     ['build:dist', 'connect:dist:keepalive']);

  grunt.initConfig(config);
};
