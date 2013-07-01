module.exports = {
  "public": {
    files: [{
      expand: true,
      cwd: 'public',
      src: ['**'],
      dest: 'tmp/public/'
    } ]
  },
  "tests": {
    files: [{
      expand: true,
      cwd: 'tests',
      src: ['index.html', 'test_helper.js', 'vendor/**/*'],
      dest: 'tmp/public/tests/'
    }]
  }
};
