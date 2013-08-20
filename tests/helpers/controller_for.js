Ember.Test.registerHelper('controllerFor', function(app, controllerName) {
  return app.__container__.lookup('controller:' + controllerName);
});
