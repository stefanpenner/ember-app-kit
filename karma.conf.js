// Karma configuration
// Generated on Fri Jul 05 2013 01:57:57 GMT-0400 (EDT)


// base path, that will be used to resolve files and exclude
basePath = 'tmp/public';


// list of files / patterns to load in the browser
files = [
  QUNIT,
  QUNIT_ADAPTER,
  'vendor/loader.js',
  'vendor/jquery.js',
  'vendor/handlebars.js',
  'vendor/ember.js',
  'assets/templates.js',
  'assets/app.js',
  'tests/test_helper.js',
  'tests/tests.js',
  'tests/test_loader.js'
];

preprocessors = {
  'assets/*.js': 'coverage'
};

// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = 'coverage';

coverageReporter = {
  type : ['text'],
  dir : 'coverage/'
}

// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
