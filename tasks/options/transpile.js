var grunt = require('grunt');

module.exports = {
  "tests": {
    type: 'amd',
    moduleName: function(path) {
      return grunt.config.process('<%= pkg.namespace %>/tests/') + path;
    },
    files: [{
      expand: true,
      cwd: 'tests/',
      src: ['**/*.js', '!vendor/**/*.js'],
      dest: 'tmp/transpiled/tests/'
    }]
  },
  "app": {
    type: 'amd',
    moduleName: function(path) {
      return grunt.config.process('<%= pkg.namespace %>/') + path;
    },
    files: [{
      expand: true,
      cwd: 'app/',
      src: '**/*.js',
      dest: 'tmp/transpiled/app/'
    }]
  }
};
