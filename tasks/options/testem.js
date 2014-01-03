// See https://npmjs.org/package/grunt-contrib-testem for more config options
module.exports = {
  basic: {
    options: {
      parallel: 2,
      framework: 'qunit',
      port: (parseInt(process.env.PORT || 7358, 10) + 1),
      src_files: [
        'tmp/result/{app,tests}/**/*.{js,coffee,css}',
        'tmp/result/index.html'
      ],
      serve_files: [
        'vendor/loader.js',
        'vendor/ember-resolver/dist/ember-resolver.js',
        'vendor/jquery/jquery.js',
        'vendor/handlebars/handlebars.js',
        'vendor/ember/ember.js',
        'vendor/ember-data/ember-data.js',
        'vendor/ic-ajax/main.js',
        'tmp/result/assets/templates.js',
        'tmp/result/assets/app.js',
        'tmp/transpiled/tests/**/*.js',
        'tests/test_helper.js',
        'tests/test_loader.js'
      ],
      launch_in_dev: ['PhantomJS', 'Chrome'],
      launch_in_ci: ['PhantomJS', 'Chrome'],
    }
  },
  browsers: {
    options: {
      parallel: 8,
      framework: 'qunit',
      port: (parseInt(process.env.PORT || 7358, 10) + 1),
      src_files: [
        'tmp/result/{app,tests}/**/*.{js,coffee,css}',
        'tmp/result/index.html'
      ],
      serve_files: [
        'vendor/loader.js',
        'vendor/ember-resolver/dist/ember-resolver.js',
        'vendor/jquery/jquery.js',
        'vendor/handlebars/handlebars.js',
        'vendor/ember/ember.js',
        'vendor/ember-data/ember-data.js',
        'vendor/ic-ajax/main.js',
        'tmp/result/assets/templates.js',
        'tmp/result/assets/app.js',
        'tmp/transpiled/tests/**/*.js',
        'tests/test_helper.js',
        'tests/test_loader.js'
      ],
      launch_in_dev: ['PhantomJS',
                     'Chrome',
                     'ChromeCanary',
                     'Firefox',
                     'Safari',
                     'IE7',
                     'IE8',
                     'IE9'],
      launch_in_ci: ['PhantomJS',
                     'Chrome',
                     'ChromeCanary',
                     'Firefox',
                     'Safari',
                     'IE7',
                     'IE8',
                     'IE9'],
    }
  }
};
