module.exports = {
  app: {
    src: ['tmp/transpiled/app/**/*.js', 'tmp/templates/templates.js'],
    dest: 'tmp/public/assets/app.js'
  },

  test: {
    src: 'tmp/transpiled/tests/**/*.js',
    dest: 'tmp/public/tests/tests.js'
  },

  vendorJs: {
    src: ['vendor/loader.js', 'vendor/jquery-*.js', 'vendor/handlebars.js', 'vendor/**/*.js'],
    dest: 'tmp/public/assets/vendor.js'
  },

  vendorCss: {
    src: ['vendor/**/*.css'],
    dest: 'tmp/public/assets/vendor.css'
  }
};
