var pathUtils = require('path'),
    grunt = require('grunt'),
    _ = grunt.util._,
    Helpers = {};

Helpers.defaultConfig = {
  pkg: grunt.file.readJSON('./package.json'),
  env: process.env
};

var taskRequirements = {
  'coffee': ['grunt-contrib-coffee'],
  'compass': ['grunt-contrib-compass'],
  'sass': ['grunt-sass', 'grunt-contrib-sass'],
  'less': ['grunt-contrib-less'],
  'stylus': ['grunt-contrib-stylus'],
  'emberTemplates': ['grunt-ember-templates'],
  'emblem': ['grunt-emblem']
};

Helpers.whenTaskIsAvailable = function(taskName) {
  // baseName of 'coffee:compile' is 'coffee'
  var baseName = taskName.split(':')[0];
  var reqs = taskRequirements[baseName];
  var isAvailable = Helpers.isPackageAvailable(reqs);
  return isAvailable ? taskName : undefined; 
};

Helpers.isPackageAvailable = function(pkgNames) {
  if ('array' !== typeof pkgNames) {
    pkgNames = [pkgNames];
  }
  return _.every(pkgNames, function(pkgName){
    return !!Helpers.defaultConfig.pkg.devDependencies[pkgName];
  });
};

Helpers.loadConfig = function(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require("../" + path + option);
  });

  return object;
}

module.exports = Helpers;