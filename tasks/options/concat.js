module.exports = {
  app: {
    src: ['tmp/transpiled/app/**/*.js'],
    dest: 'tmp/public/assets/app.js'
  },

  test: {
    src: 'tmp/transpiled/tests/**/*.js',
    dest: 'tmp/public/tests/tests.js'
  },

  vendorCss: {
    src: ['vendor/**/*.css'],
    dest: 'tmp/public/assets/vendor.css'
  }
};
