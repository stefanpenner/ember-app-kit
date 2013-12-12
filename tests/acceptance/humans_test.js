var App;

module('Acceptances - humans.txt', {
  setup: function(){
    fakehr.start();
    App = startApp();
  },
  teardown: function() {
    fakehr.reset();
    Ember.run(App, 'destroy');
  }
});

test('respond with httpRespond', function(){
  expect(1);

  visit('/humans-test');
  httpRespond( 'GET', 'humans.txt', ['All your base are belong to us!']);
  andThen(function(){
    ok(exists('pre:contains("All your base are belong to us!")'));
  });
});
