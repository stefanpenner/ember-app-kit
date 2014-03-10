import test from 'ember-qunit/test';
import moduleForComponent from 'ember-qunit/module-for-component';

moduleForComponent('template-less');

test("template", function(){
  var component = this.subject();
  ok(this.$());
});
