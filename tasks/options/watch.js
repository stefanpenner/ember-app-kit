var Helpers = require('../helpers');

module.exports = {
  main: {
    files: ['{app,public,vendor,tests}/**/*'],
    tasks: Helpers.config.shouldCompileIncrementally ? [] : ['build:debug']
  },
  test: {
    files: ['{app,public,vendor,tests}/**/*'],
    tasks: ['build:debug', 'karma:server:run']
  },
  options: {
    debounceDelay: 200,
    // Disable 'spawn' option to keep the watch running under 
    // the same context since we're dynamically modifying 
    // and accessing configuration elsewhere
    spawn: !Helpers.config.shouldCompileIncrementally
  }
};