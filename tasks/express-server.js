module.exports = function(grunt) {
  var express = require('express'),
      lockFile = require('lockfile'),
      Helpers = require('./helpers'),
      fs = require('fs'),
      path = require('path'),
      request = require('request');

  /**
  Task for serving the static files.

  Note: The expressServer:debug task looks for files in multiple directories.
  */
  grunt.registerTask('expressServer', function(target, proxyMethodToUse) {
    // Load namespace module before creating the server
    require('express-namespace');

    var app = express(),
        done = this.async(),
        proxyMethod = proxyMethodToUse || grunt.config('express-server.options.APIMethod');

    app.use(lock);
    app.use(express.compress());

    if (proxyMethod === 'stub') {
      grunt.log.writeln('Using API Stub');

      // Load API stub routes
      app.use(express.json());
      app.use(express.urlencoded());
      require('../api-stub/routes')(app);
    } else if (proxyMethod === 'proxy') {
      var proxyURL = grunt.config('express-server.options.proxyURL'),
          proxyPath = grunt.config('express-server.options.proxyPath') || '/api';
      grunt.log.writeln('Proxying API requests matching ' + proxyPath + '/* to: ' + proxyURL);

      // Use API proxy
      app.all(proxyPath + '/*', passThrough(proxyURL));
    }

    if (target === 'debug') {
      // For `expressServer:debug`

      // Add livereload middleware after lock middleware if enabled
      if (Helpers.isPackageAvailable("connect-livereload")) {
        var liveReloadPort = grunt.config('watch.options.livereload');
        app.use(require("connect-livereload")({port: liveReloadPort}));
      }

      // YUIDoc serves static HTML, so just serve the index.html
      app.all('/docs', function(req, res) { res.redirect(302, '/docs/index.html'); });
      app.use(static({ urlRoot: '/docs', directory: 'docs' }));

      // These three lines simulate what the `copy:assemble` task does
      app.use(static({ urlRoot: '/config', directory: 'config' }));
      app.use(static({ urlRoot: '/vendor', directory: 'vendor' }));
      app.use(static({ directory: 'public' }));
      app.use(static({ urlRoot: '/tests', directory: 'tests' })); // For test-helper.js and test-loader.js
      app.use(static({ directory: 'tmp/result' }));
      app.use(static({ file: 'tmp/result/index.html', ignoredFileExtensions: /\.\w{1,5}$/ })); // Gotta catch 'em all
    } else {
      // For `expressServer:dist`

      app.use(lock);
      app.use(static({ directory: 'dist' }));
      app.use(static({ file: 'dist/index.html', ignoredFileExtensions: /\.\w{1,5}$/ })); // Gotta catch 'em all
    }

    var port = parseInt(grunt.config('express-server.options.serverPort') || 8000, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      grunt.fail.fatal('The package.json "expressServerPort" variable of ' + port + ' is not valid.');
    }
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

        if (options.ignoredFileExtensions) {
          if (options.ignoredFileExtensions.test(req.path)) {
            res.send(404, {error: 'Resource not found'});
            return; // Do not serve index.html
          }
        }

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

  function passThrough(target) {
    return function(req, res) {
      req.pipe(request(target+req.url)).pipe(res);
    };
  }
};
