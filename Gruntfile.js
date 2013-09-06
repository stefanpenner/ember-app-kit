module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');

  grunt.registerTask('default', "Build (in debug mode) & test your application.", ['test']);
  grunt.registerTask('build',   [
                     'clean:build',
                     'lock',
                     // Uncomment this line  & `npm install --save-dev grunt-contrib-coffee` for CoffeeScript support.
                     // 'coffee',
                     'copy:prepare',
                     'transpile',
                     'jshint',
                     'copy:stage',
                     // Uncomment line below & `npm install --save-dev grunt-sass` for SASS (SCSS only) support.
                     // or run `npm install --save-dev grunt-contrib-sass` for SCSS/SASS support (may be slower).
                     // 'sass:compile',
                     // Uncomment this line & `npm install --save-dev grunt-contrib-less` for LESS support.
                     // 'less:compile'
                     // Uncomment this line & `npm install --save-dev grunt-contrib-stylus` for stylus/nib support.
                     // 'stylus:compile'
                     'concat_sourcemap',
                     'unlock' ]);

  grunt.registerTask('build:debug', "Build a development-friendly version of your app.", [
                     'build',
                     'emberTemplates:debug',
                     'copy:vendor' ]);

  grunt.registerTask('build:dist', "Build a minified & production-ready version of your app.", [
                     'build',
                     'clean:release',
                     'emberTemplates:dist',
                     'dom_munger:distEmber',
                     'dom_munger:distHandlebars',
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'copy:dist',
                     'rev',
                     'usemin' ]);

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
};


// TODO: extract this out
function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}

