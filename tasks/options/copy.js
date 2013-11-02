module.exports = {

  // Note: These tasks are listed in the order in which they will run.

  javascriptToTmp: {
    files: [{
      expand: true,
      cwd: 'app',
      src: '**/*.js',
      dest: 'tmp/javascript/app'
    },
    {
      expand: true,
      cwd: 'tests',
      src: ['**/*.js', '!test_helper.js', '!test_loader.js'],
      dest: 'tmp/javascript/tests/'
    }]
  },

  cssToResult: {
    expand: true,
    cwd: 'app/styles',
    src: ['**/*.css'],
    dest: 'tmp/result/assets'
  },

  // Assembles everything in `tmp/result`
  assemble: {
    files: [{
      expand: true,
      cwd: 'tests',
      src: ['test_helper.js', 'test_loader.js'],
      dest: 'tmp/result/tests/'
    }, {
      expand: true,
      cwd: 'public',
      src: ['**'],
      dest: 'tmp/result/'
    }, {
      src: ['vendor/**/*.js', 'vendor/**/*.css'],
      dest: 'tmp/result/'
    }
    ]
  },

  imageminFallback: {
    files: [{
      expand: true,
      cwd: 'tmp/result',
      src: '**/*.{png,gif,jpg,jpeg}',
      dest: 'dist/'
    }]
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'tmp/result',
      src: [
        '**',
        '!**/*.{css,js}', // Handled by concat
        '!**/*.{png,gif,jpg,jpeg}', // Handled by imagemin
        '!tests/**/*', // No tests, please
        '!**/*.map' // No source maps
      ],
      filter: 'isFile',
      dest: 'dist/'
    }]
  },
};
