module.exports = function(grunt) {
  var express = require('express'),
      lockFile = require('lockfile'),
      Helpers = require('./helpers');

  /**
  Task for serving the static files.

  Note: The expressServer:debug task looks for files in multiple directories.
  */
  grunt.registerTask('expressServer', function(target) {
    var app = express(),
        done = this.async();

    app.use(lock);

    if (target === 'debug') {
      // For `expressServer:debug`:

      // Add livereload middlware after lock middleware if enabled
      if (Helpers.isPackageAvailable("connect-livereload")) {
        app.use(require("connect-livereload")());
      }

      app.use(static({ urlRoot: '/assets/images', directory: 'tmp/images' }));
      app.use(static({ urlRoot: '/assets/images', directory: 'app/images' }));
      app.use(static({ urlRoot: '/vendor', directory: 'vendor' }));
      app.use(static({ directory: 'tmp/public' }));
      app.use(static({ file: 'tmp/public/index.html' })); // Gotta catch 'em all
    } else {
      // For `expressServer:dist`:

      app.use(lock);
      app.use(static({ directory: 'dist' }));
      app.use(static({ file: 'dist/index.html' })); // Gotta catch 'em all
    }

    app.listen(process.env.PORT || 8000);
    if (!this.flags.keepalive) { done(); }
  });


  // Middleware
  // ==========

  function lock(req, res, next) { // Works with tasks/locking.js
    (function retry() {
      if (lockFile.checkSync('tmp/connect.lock')) {
        setTimeout(retry, 30);
      } else { next(); }
    })();
  }

  function static(options) {
    return function(req, res, next) { // Gotta catch 'em all (and serve index.html)
      var filePath = "";
      if (options.directory) {
        var regex = new RegExp('^' + (options.urlRoot || ''));
        // URL must begin with urlRoot's value
        if (!req.path.match(regex)) { next(); return; } 
        filePath = options.directory + req.path.replace(regex, '');
      } else if (options.file) {
        filePath = options.file;
      } else { throw new Error('static() isn\'t properly configured!'); }
      
      res.sendfile(filePath, function(err) { if (err) { next(); } });
    };
  } 
};