var vendor = {
  jquery: 'vendor/jquery/jquery.js',
  handlebars: 'vendor/handlebars/dist/handlebars.runtime.js',
  ember: 'vendor/ember/index.js'
};

module.exports = {

  app: {
    src: [
      'tmp/public/assets/templates.js',
      'tmp/transpiled/app/index.js'
    ],
    dest: 'tmp/public/assets/app.js',
    options: {
      debug: true,
      external: ['jquery', 'handlebars', 'ember'],
    }
  },

  vendor: {
    src: [
      vendor.jquery,
      vendor.handlebars,
      vendor.ember,
    ],
    dest: 'tmp/public/assets/vendor.js',
    options: {
      debug: false, // set to true for source maps in vendor.js
      // see https://github.com/jmreidy/grunt-browserify/issues/89
      // when this is fixed the task will run much faster
      //noParse: [
        //vendor.jquery,
        //vendor.handlebars,
        //vendor.ember
      //]
      shim: {
        'ember-imports': {
          path: 'vendor/ember-imports.js',
          exports: 'Ember'
        },
        jquery: {
          path: vendor.jquery,
          exports: 'jQuery'
        },
        handlebars: {
          path: vendor.handlebars,
          exports: 'Handlebars'
        },
        ember: {
          path: vendor.ember,
          exports: 'Ember',
          depends: {
            'ember-imports': 'Ember',
            jquery: 'jQuery',
            handlebars: 'Handlebars'
          }
        }
      }
    }
  }
};

