Ember.Test.registerHelper('routeFor', function(app, routeName) {
  return app.__container__.lookup('route:' + routeName);
});
