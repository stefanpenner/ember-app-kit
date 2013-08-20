var lockFile = require('lockfile'),
    fs = require('fs'),
    url = require('url');

module.exports = {
  server: {
    options: {
      port: process.env.PORT || 8000,
      hostname: '0.0.0.0',
      base: 'tmp/public',
      // Use this option to have the catch-all return a different
      // page than index.html on any url not matching an asset.
      //   wildcard: 'not_index.html'
      middleware: middleware
    }
  },
  dist: {
    options: {
      port: process.env.PORT || 8000,
      hostname: '0.0.0.0',
      base: 'dist/',
      middleware: middleware
    }
  }
};

// works with tasks/locking.js
function lock(req, res, next) {
  (function retry() {
    if (lockFile.checkSync('connect.lock')) {
      setTimeout(retry, 30);
    } else {
      next();
    }
  }());
}

function buildWildcardMiddleware(options) {
  return function(req, res, next) {
    if ('GET' != req.method.toUpperCase() && 'HEAD' != req.method.toUpperCase()) { return next();  }

    var wildcard     = (options.wildcard || 'index.html'),
        wildcardPath = options.base + "/" + wildcard;

    fs.readFile(wildcardPath, function(err, data){
      if (err) { return next('ENOENT' == err.code ? null : err); }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
}

function middleware(connect, options) {
  return [
    lock,
    connect['static'](options.base),
    connect.directory(options.base),
    // Remove this middleware to disable catch-all routing.
    buildWildcardMiddleware(options)
  ];
}
