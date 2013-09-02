module.exports = {
  distEmber: {
    options: {
      //Point the index.html file at ember-prod js instead of dev version
      update: {
        selector:'script[src="/vendor/ember/index.js"]',
        attribute:'src',
        value:'/vendor/ember-prod/index.js'
      }
    },
    src: 'tmp/public/index.html'
  },
  distHandlebars: {
    options: {
      update: {
        selector:'script[src="/vendor/handlebars/handlebars.js"]',
        attribute:'src',
        value:'/vendor/handlebars/handlebars.runtime.js'
      }
    },
    src: 'tmp/public/index.html'
  }
};
