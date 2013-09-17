var pathUtils = require('path'),
    grunt = require('grunt'),
    _ = grunt.util._,
    Helpers = {};

// Grunt configuration. Object is expected to be mutated in Gruntfile.
Helpers.config = {
  pkg: grunt.file.readJSON('./package.json'),
  env: process.env
};

// List of package requisits for tasks
var taskRequirements = {
  'coffee': ['grunt-contrib-coffee'],
  'compass': ['grunt-contrib-compass'],
  'sass': ['grunt-sass', 'grunt-contrib-sass'],
  'less': ['grunt-contrib-less'],
  'stylus': ['grunt-contrib-stylus'],
  'emberTemplates': ['grunt-ember-templates'],
  'emblem': ['grunt-emblem']
};

Helpers.filterAvailableTasks = function(tasks){
  tasks = tasks.filter(Helpers.whenTaskIsAvailable);
  return _.compact(tasks);
};

// @returns taskName if given task is available, undefined otherwise
Helpers.whenTaskIsAvailable = function(taskName) {
  var baseName, reqs, isAvailable;
  // baseName of 'coffee:compile' is 'coffee'
  baseName = taskName.split(':')[0];
  reqs = taskRequirements[baseName];
  isAvailable = Helpers.isPackageAvailable(reqs);
  return isAvailable ? taskName : undefined; 
};

Helpers.isPackageAvailable = function(pkgNames) {
  if (!pkgNames) return true;  // packages are assumed to exist

  if (!_.isArray(pkgNames)) {
    pkgNames = [pkgNames];
  }
  return _.any(pkgNames, function(pkgName){
    return !!Helpers.config.pkg.devDependencies[pkgName];
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
};

module.exports = Helpers;
