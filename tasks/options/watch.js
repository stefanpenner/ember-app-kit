module.exports = {
  main: {
    files: ['app/**/*', 'public/**/*', 'vendor/**/*', 'tests/**/*'],
    tasks: ['build']
  },
  options: {
    nospawn: true
  }
};
