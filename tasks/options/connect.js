var lockFile = require('lockfile')

module.exports = {
  server: {
    options: {
      port: process.env.PORT || 8000,
      hostname: '0.0.0.0',
      base: 'tmp/public',
      middleware: middleware
    }
  }
};

// works with tasks/locking.js
function lock(req, res, next) {
  (function retry() {
    lockFile.checkSync('connect.lock') ? retry() : next()
  }());
}

function middleware(connect, options) {
  return [
    lock,
    connect['static'](options.base),
    connect.directory(options.base)
  ];
}
