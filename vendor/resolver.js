define("resolver",
  [],
  function() {
    "use strict";
  /*
   * This module defines a subclass of Ember.DefaultResolver that adds two
   * important features:
   *
   *  1) The resolver makes the container aware of es6 modules via the AMD
   *     output. The loader's registry is consulted so that classes can be 
   *     resolved directly via the module loader, without needing a manual
   *     `import`.
   *  2) is able provide injections to classes that implement `extend`
   *     (as is typical with Ember).
   */
  var typeMap = {
    view: 'views',
    util: 'utils',
    route: 'routes',
    action: 'actions',
    service: 'services',
    behaviour: 'behaviour',
    controller: 'controllers'
  };

  function classFactory(klass) {
    return {
      create: function (injections) {
        if (typeof klass.extend === 'function') {
          return klass.extend(injections);  
        } else {
          return klass;
        }
      }
    };
  }

  var underscore = Ember.String.underscore;

  function resolveOther(parsedName) {
    var prefix = this.namespace.modulePrefix;
    Ember.assert('module prefix must be defined', prefix);

    var pluralizedType = typeMap[parsedName.type] || parsedName.type;
    var name = parsedName.fullNameWithoutType;

    var moduleName = prefix + '/' +  pluralizedType + '/' + underscore(name);
    var module;

    // need define.registry in almond to get rid of this mess
    try {
      module = require(moduleName);
    } catch(e) {}

    //if (define.registry[moduleName]) {
    if (module) {
      //module = require(moduleName);

      if (typeof module.create !== 'function') {
        module = classFactory(module);
      }

      if (Ember.ENV.LOG_MODULE_RESOLVER){
        Ember.logger.info('hit', moduleName);
      }

      return module;
    } else  {
      if (Ember.ENV.LOG_MODULE_RESOLVER){
        Ember.logger.info('miss', moduleName);
      }

      return this._super(parsedName);
    }
  }

  // Ember.DefaultResolver docs:
  //   https://github.com/emberjs/ember.js/blob/master/packages/ember-application/lib/system/resolver.js
  var Resolver = Ember.DefaultResolver.extend({
    resolveOther: resolveOther
  });

  return Resolver;
});
