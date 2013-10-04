var App;

module('Acceptances - Component', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('component output is rendered', function(){
  expect(3);

  visit('/component-test').then(function(){
    var title = find('h2#title');
    var list = find('.pretty-color');

    equal(title.text(), 'Welcome to Ember.js');

    equal(list.length, 3);
    equal(list.first().text(), 'Pretty Color: purple\n');
  });
});

