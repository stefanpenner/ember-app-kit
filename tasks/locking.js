var lockFile = require('lockfile');

module.exports = function(grunt) {
  grunt.registerTask('lock', 'Set semaphore for connect server to wait on.', function() {
    grunt.file.mkdir('tmp');
    lockFile.lockSync('tmp/connect.lock');
  });

  grunt.registerTask('unlock', 'Release semaphore that connect server waits on.', function() {
    console.log("unlocking");
    lockFile.unlockSync('tmp/connect.lock');
  });
};
