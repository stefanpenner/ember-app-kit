module.exports = function(grunt) {
  var express = require('express'),
      lockFile = require('lockfile'),
      Helpers = require('./helpers'),
      fs = require('fs'),
      path = require('path');

  /**
  Task for serving the static files.

  Note: The expressServer:debug task looks for files in multiple directories.
  */
  grunt.registerTask('expressServer', function(target) {
    var app = express(),
        done = this.async();

    app.use(lock);
    app.use(express.compress());

    if (target === 'debug') {
      // For `expressServer:debug`

      // Add livereload middlware after lock middleware if enabled
      if (Helpers.isPackageAvailable("connect-livereload")) {
        app.use(require("connect-livereload")());
      }

      // These three lines simulate what the `copy:assemble` task does
      app.use(static({ urlRoot: '/vendor', directory: 'vendor' }));
      app.use(static({ directory: 'public' }));
      app.use(static({ urlRoot: '/tests', directory: 'tests' })); // For test_helper.js and test_loader.js

      app.use(static({ directory: 'tmp/result' }));
      app.use(static({ file: 'tmp/result/index.html' })); // Gotta catch 'em all
    } else {
      // For `expressServer:dist`

      app.use(lock);
      app.use(static({ directory: 'dist' }));
      app.use(static({ file: 'dist/index.html' })); // Gotta catch 'em all
    }

    var port = process.env.PORT || 8000;
    app.listen(port);
    grunt.log.ok('Started development server on port %d.', port);
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

      fs.stat(filePath, function(err, stats) {
        if (err) { next(); return; } // Not a file, not a folder => can't handle it

        // Is it a directory? If so, search for an index.html in it.
        if (stats.isDirectory()) { filePath = path.join(filePath, 'index.html'); }

        // Serve the file
        res.sendfile(filePath, function(err) {
          if (err) { next(); return; }
          grunt.verbose.ok('Served: ' + filePath);
        });
      });
    };
  }
};
