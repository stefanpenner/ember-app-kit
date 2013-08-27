module.exports = {
  distDependencies: {
    options: {
      //Point the index.html file at ember-prod js instead of dev version
      update: {
        selector:'script[src="/vendor/ember/index.js"]',
        attribute:'src',
        value:'/vendor/ember-prod/index.js'
      }
    },
    src: 'tmp/public/index.html'
  }
};