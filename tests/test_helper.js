document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

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
