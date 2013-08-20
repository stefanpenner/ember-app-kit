import Index from 'appkit/routes/index';
import App from 'appkit/app';

var route;

module("Unit - IndexRoute", {
  setup: function(){
    route = routeFor('index');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Ember.Route);
});

test("#model", function(){
  deepEqual(route.model(), ['red', 'yellow', 'blue']);
});
