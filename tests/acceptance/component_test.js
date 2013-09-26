var App;

module("Acceptances - Component", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("component output is rendered", function(){
  expect(3);

  visit('/component-test').then(function(){
    ok(exists("h2:contains('Welcome to Ember.js')"));

    var list = find(".pretty-color");
    equal(list.length, 3);
    equal(list.first().text(), "Pretty Color: purple\n");
  });
});

