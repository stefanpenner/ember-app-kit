module.exports = {
  compile: {
    files: {
      "tmp/public/assets/templates.js": ['app/templates/**/*.{emblem,hbs,hjs,handlebars}']
    },
    options: {
      root: 'app/templates/',
      dependencies: {
        jquery: 'vendor/jquery/jquery.js',
        ember: 'vendor/ember/index.js',
        handlebars: 'vendor/handlebars/handlebars.js',
        //specify where you put emblem.js here
        emblem: 'vendor/handlebars/emblem.js'
      }
    }
  }
};