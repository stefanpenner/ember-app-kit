import 'resolver' as Resolver;

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  resolver: Resolver
});

import 'appkit/routes' as routes;
App.Router.map(routes); // TODO: just resolve the router

export = App;
