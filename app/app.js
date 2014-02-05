import Resolver from 'resolver';

var params = window.ENV.ApplicationParams;

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: params.LOG_ACTIVE_GENERATION,
  LOG_MODULE_RESOLVER: params.LOG_MODULE_RESOLVER,
  LOG_TRANSITIONS: params.LOG_TRANSITIONS,
  LOG_TRANSITIONS_INTERNAL: params.LOG_TRANSITIONS_INTERNAL,
  LOG_VIEW_LOOKUPS: params.LOG_VIEW_LOOKUPS,
  modulePrefix: params.modulePrefix,
  Resolver: Resolver['default']
});

export default App;
