import test from 'ember-qunit/test';
import moduleFor from 'ember-qunit/module-for';

import Index from 'appkit/routes/index';

moduleFor('route:index', "Unit - IndexRoute");

test("it exists", function(){
  ok(this.subject() instanceof Index);
});

test("#model", function(){
  deepEqual(this.subject().model(), ['red', 'yellow', 'blue']);
});
