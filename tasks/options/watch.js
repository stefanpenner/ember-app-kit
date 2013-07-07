module.exports = {
  main: {
    files: ['app/**/*', 'public/**/*', 'vendor/**/*', 'tests/**/*'],
    tasks: ['build:debug']
  },
  options: {
    nospawn: true
  }
};
