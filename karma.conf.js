// Karma configuration
// Generated on Fri Jul 05 2013 01:57:57 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // list of files / patterns to load in the browser
    files: [
      'config/environment.js',
      'config/environments/test.js',
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

    frameworks: ['qunit'],

    plugins: [
      'karma-qunit',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      //'karma-safari-launcher'  // npm install karma-safari-launcher
    ],

    preprocessors: {
      'tmp/result/assets/*.js': 'coverage'
    },

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: 'coverage',

    coverageReporter: {
      type : ['text'],
      dir : 'coverage/'
    },

    // web server port
    port: parseInt(process.env.PORT, 10) + 1 || 9876,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
