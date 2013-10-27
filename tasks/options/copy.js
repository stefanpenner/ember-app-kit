module.exports = {

  "javascriptToTmp": {
    files: [{
      expand: true,
      cwd: 'app/',
      src: '**/*.js',
      dest: 'tmp/javascript/app'
    },
    {
      expand: true,
      cwd: 'tests/',
      src: ['**/*.js', '!test_helper.js', '!test_loader.js', '!vendor/**/*.js'],
      dest: 'tmp/javascript/tests/'
    }]
  },

  // Puts gathers files in `tmp/public`
  assemble: {
    files: [{
      expand: true,
      cwd: 'tests/',
      src: ['test_helper.js', 'test_loader.js', 'vendor/**/*'],
      dest: 'tmp/public/tests/'
    }, {
      expand: true,
      cwd: 'public/',
      src: ['**'],
      dest: 'tmp/public/'
    }, {
      src: ['vendor/**/*.js', 'vendor/**/*.css'],
      dest: 'tmp/public/'
    }
    ]
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'tmp/public',
      src: ['**', '!coverage'],
      dest: 'dist/'
    }]
  },
};
