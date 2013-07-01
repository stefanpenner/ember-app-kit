document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
document.write('<style>#ember-testing-container { position: absolute; background: white; bottom: 0; right: 0; width: 640px; height: 384px; overflow: auto; z-index: 9999; border: 1px solid #ccc; } #ember-testing { zoom: 50%; }</style>');

Ember.testing = true;

var App = requireModule('appkit/app');

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

function exists(selector) {
  return !!find(selector).length;
}

window.exists = exists;

Ember.Container.prototype.stub = function(fullName, instance) {
  instance.destroy = instance.destroy || function() {};
  this.cache.dict[fullName] = instance;
};
