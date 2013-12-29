import Application from 'appkit/app';
import Router from 'appkit/router';

function startApp(attrs) {
  var App;

  var attributes = Ember.merge({
    // useful Test defaults
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false
  }, attrs); // but you can override;

  Ember.run.join(function(){
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  Router.reopen({
    location: 'none'
  });

  Ember.run(App, 'advanceReadiness');

  return App;
}

export default startApp;
