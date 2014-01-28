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
