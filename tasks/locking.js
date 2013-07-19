var lockFile = require('lockfile');

module.exports = function(grunt) {
  grunt.registerTask('lock', 'Set semaphore for connect server to wait on.', function() {
    lockFile.lockSync('connect.lock');
  });

  grunt.registerTask('unlock', 'Release semaphore that connect server waits on.', function() {
    lockFile.unlockSync('connect.lock');
  });
};
