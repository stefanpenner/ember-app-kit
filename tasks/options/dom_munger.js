module.exports = {
  dist_dependencies: {
    options: {
      update: {selector:'script[src="/vendor/ember/index.js"]',attribute:'src',value:'/vendor/ember-prod/index.js'} //Point the index.html file at ember-prod js instead of dev version
    },
    src: 'tmp/public/index.html'
  }
};