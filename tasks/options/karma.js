module.exports = {
  options: {
    configFile: 'karma.conf.js',
    browsers: ['Chrome']
  },
  ci: {
    singleRun: true,
    browsers: ['PhantomJS']
  },
  test: {
    reporters: 'dots',
    browsers: ['Chrome'],
  },
  browsers: {
    reporters: 'dots',
    singleRun: true,
    browsers: ['Chrome', 'ChromeCanary', 'Safari', 'Firefox', 'PhantomJS']
  }  
}