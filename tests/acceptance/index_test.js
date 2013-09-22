var App;

module("Acceptances - Index", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("index renders", function(){
  expect(3);

  visit('/').then(function(){
    ok(exists("h2:contains('Welcome to Ember.js')"));

    var list = find("ul li");
    equal(list.length, 3);
    equal(list.text(), "redyellowblue");
  });
});
