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
    singleRun: true,
  },
  server: {
    background: true
  },
  browsers: {
    singleRun: true,
    browsers: ['Chrome', 'ChromeCanary', 'Safari', 'Firefox', 'PhantomJS']
  }  
}