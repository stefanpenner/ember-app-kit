module.exports = {
  server: {
    options: {
      port: 8000,
      hostname: '0.0.0.0',
      base: 'tmp/public',
      middleware: middleware
    }
  }
};

// works with tasks/locking.js
function lock(req, res, next) {
  (function retry() {
    process.isLocked ? setTimeout(retry, 100) : next();
  }());
}

function middleware(connect, options) {
  return [
    lock,
    connect['static'](options.base),
    connect.directory(options.base)
  ];
}
