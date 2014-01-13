var _ = require('lodash');

function merge(a, base) {
  // NB: `a' is overwritten with the result of the merge
  return _.merge(a, base, function(obj, src) {
    if (_.isArray(obj)) {
      return obj.concat(src);
    } else if (obj === null) {
      return '';
    } else if (_.isString(obj)) {
      return obj;
    }

    return undefined;
  });
}

var baseOpts = {
  src: 'app/index.html',
  dest: 'tmp/result/',
  options: {
    prefix: '/',
    relative: false,
    parseTag: 'htmlbuild',
    scripts: {
      app: [
        'tmp/transpiled/app/**/*.js',
        '!**/_boot.js',
        'tmp/result/assets/templates.js'
      ],
      boot: 'app/_boot.js',
      config: [
        'config/environment.js'
      ],
      vendor: [
        'vendor/ember-data/ember-data.js',
        'vendor/loader.js',
        'vendor/ember-resolver/dist/ember-resolver.js',
        'vendor/ic-ajax/main.js'
      ]
    },
    styles: {
      bundle: ['tmp/**/*.css']
    }
  }
};

module.exports = {
  dist: merge({
    options: {
      scripts: {
        config: [
          'config/environments/production.js'
        ],
        vendor: [
          'vendor/jquery/jquery.js',
          'vendor/handlebars/handlebars.runtime.js',
          'vendor/ember/ember.prod.js'
        ]
      }
    }
  }, baseOpts),

  debug: merge({
    options: {
      scripts: {
        config: [
          'config/environments/development.js'
        ],
        vendor: [
          'vendor/jquery/jquery.js',
          'vendor/handlebars/handlebars.js',
          'vendor/ember/ember.js'
        ]
      }
    }
  }, baseOpts),

  test: merge({
    dest: 'tmp/result/tests/',
    options: {
      scripts: {
        boot: null,
        config: [
          'config/environments/test.js'
        ],
        vendor: [
          'vendor/jquery/jquery.js',
          'vendor/handlebars/handlebars.js',
          'vendor/ember/ember.js',
          'vendor/qunit/qunit/qunit.js'
        ],
        tests: [
          'tmp/transpiled/tests/**/*.js',
          'tests/test_helper.js',
          'tests/test_loader.js'
        ],
      },
      styles: {
        bundle: [
          'vendor/qunit/qunit/qunit.css',
          'tests/style.css'
        ]
      },
      sections: {
        tests: 'tests/body.html'
      }
    }
  }, baseOpts)
};
