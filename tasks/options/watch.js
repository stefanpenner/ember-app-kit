module.exports = {
  main: {
    files: ['app/**/*', 'public/**/*', 'vendor/**/*', 'tests/**/*'],
    tasks: ['build:debug', 'test:run']
  },
  options: {
    nospawn: true
  }
};
