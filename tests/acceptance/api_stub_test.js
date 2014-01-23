var App;

module('API Stub', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('returns posts', function(){
  expect(1);
  visit('/');
  ic.ajax('/api/posts/1').then(function(result){
    ok(result.response.post);
  });
});
