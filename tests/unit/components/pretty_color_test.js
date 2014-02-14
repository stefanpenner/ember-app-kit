import { test , moduleForComponent } from 'appkit/tests/helpers/module_for';

moduleForComponent('pretty-color');

test("changing colors", function(){
  var component = this.subject();

  Ember.run(function(){
    component.set('name','red');
  });

  // first call to $() renders the component.
  equal(this.$().attr('style'), 'color: red;');

  Ember.run(function(){
    component.set('name', 'green');
  });

  equal(this.$().attr('style'), 'color: green;');
});

test("className", function(){
  // first call to this.$() renders the component.
  ok(this.$().is('.pretty-color'));
});

test("template", function(){
  var component = this.subject();

  equal($.trim(this.$().text()), 'Pretty Color:');

  Ember.run(function(){
    component.set('name', 'green');
  });

  equal($.trim(this.$().text()), 'Pretty Color: green');
});

test("has button", function() {
  equal(this.$().find('button').length, 1);
});

test("changeName action", function() {
  var component = this.subject();

  expect(2);

  Ember.run(function(){
    component.send('changeName', 'blue');
  });

  equal(component.get('name'), 'blue');
  equal($.trim(this.$().text()), 'Pretty Color: blue');
});

test("button changes color", function() {
  var component = this.subject();

  expect(2);

  this.$().find('button').trigger('click');

  equal(component.get('name'), 'blue');
  equal($.trim(this.$().text()), 'Pretty Color: blue');
});
