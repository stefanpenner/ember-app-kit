var grunt = require('grunt');

module.exports = {
  options: {
    whitelist: {
      'ember/resolver': ['default'],
      'ember/load-initializers': ['default'],
      'ember-qunit': ['moduleForComponent', 'moduleForModel', 'moduleFor', 'test', 'default'],
      'ic-ajax': ['default', 'request', 'raw', 'defineFixture', 'lookupFixture'],
    }
  },

  app: {
    options: {
      moduleName: function (name) {
        return grunt.config.process('<%= package.namespace %>/') + name;
      }
    },
    files: [{
      expand: true,
      cwd: 'app',
      src: ['**/*.js']
    }]
  },

  tests: {
    options: {
      moduleName: function (name) {
        // Trim of the leading app/ from app modules
        if (name.slice(0, 4) === 'app/') {
          name = name.slice(4);
        }
        return grunt.config.process('<%= package.namespace %>/') + name;
      }
    },
    // Test files reference app files so we have to make sure we pull in both sets
    files: [{
      expand: true,
      cwd: '.',
      src: ['tests/**/*.js']
    }, {
      expand: true,
      cwd: '.',
      src: ['app/**/*.js']
    }]
  }
};
