module.exports = {
  // Stage moves files to their final destinations after the rest
  // of the build cycle has run.
  //
  "stage": {
    files: [{
      expand: true,
      cwd: 'tests/',
      src: ['index.html', 'test_helper.js', 'test_loader.js', 'vendor/**/*'],
      dest: 'tmp/public/tests/'
    },
    {
      expand: true,
      cwd: 'public/',
      src: ['**'],
      dest: 'tmp/public/'
    }]
  },
  "vendor": {
    src: ['vendor/**/*.js'],
    dest: 'tmp/public/'
  },
};
