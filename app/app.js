import Resolver from 'resolver';
import registerComponents from 'appkit/utils/register_components';

var App = Ember.Application.extend({
  LOG_MODULE_RESOLVER: true,
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver
});

App.initializer({
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
});

/*
When registering a custom store into the application you have to make sure your initializer runs
before the 'store' initializer. You can do so as follows:

import YourCustomStore from 'appkit/store';
App.initializer({
  name: 'Register Custom Store',
  before: 'store',
  initialize: function(container, application) {
    application.store = YourCustomStore;
  }
});
*/

export default App;
