module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('tasks');

  grunt.registerTask('default', "Build (in debug mode) & test your application.", ['build:debug', 'test']);
  grunt.registerTask('build',   [
                     'lock',
                     'clean:build',
                     // Uncomment this line  & `npm install --save-dev grunt-contrib-coffee` for CoffeeScript support.
                     // 'coffee',
                     'copy:prepare',
                     'transpile',
                     'jshint',
                     'copy:stage',
                     'emberTemplates:compile',
                     // Uncomment this line & `npm install --save-dev grunt-sass` for SASS support.
                     // 'sass:compile',
                     // Uncomment this line & `npm install --save-dev grunt-contrib-less` for LESS support.
                     // 'less:compile'
                     // Uncomment this line & `npm install --save-dev grunt-contrib-stylus` for stylus/nib support.
                     // 'stylus:compile'
                     'concat',
                     'unlock' ]);

  grunt.registerTask('build:debug', "Build a development-friendly version of your app.", [
                     'build',
                     'copy:vendor' ]);

  grunt.registerTask('build:dist', "Build a minified & production-ready version of your app.", [
                     'useminPrepare',
                     'build',
                     'uglify',
                     'copy:dist',
                     'rev',
                     'usemin' ]);

  grunt.registerTask('test', "Run your apps's tests once. Uses Google Chrome by default. Logs coverage output to tmp/public/coverage.", [
                     'karma:test' ]);

  grunt.registerTask('test:ci', "Run your app's tests in PhantomJS. For use in continuous integration (i.e. Travis CI).", [
                     'karma:ci' ]);

  grunt.registerTask('test:server', "Start a Karma test server. Automatically reruns your tests when files change and logs the results to the terminal.", [
                     'build:debug', 'karma:server', 'connect', 'watch:test']);

  grunt.registerTask('server', "Run your server in development mode, auto-rebuilding when files change.",
                     ['build:debug', 'connect', 'watch:main']);
  grunt.registerTask('server:dist', "Preview production (minified) assets.",
                     ['build:dist', 'connect:server:keepalive']);
};


// TODO: extract this out
function loadConfig(path) {
  var string = require('string');
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    key = string(key).camelize().s;
    object[key] = require(path + option);
  });

  return object;
}

