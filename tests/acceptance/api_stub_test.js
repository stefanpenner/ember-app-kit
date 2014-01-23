var App;

module('API Stub', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

asyncTest('responds via proxy', function(){
  expect(1);
  ic.ajax('/api/posts/1').then(function(result){
    start();
    ok(result.post);
  });
});
