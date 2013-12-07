document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;

window.startApp          = require('appkit/tests/helpers/start_app')['default'];
window.isolatedContainer = require('appkit/tests/helpers/isolated_container')['default'];

function exists(selector) {
  return !!find(selector).length;
}

function getAssertionMessage(actual, expected, message) {
  return message || QUnit.jsDump.parse(expected) + " expected but was " + QUnit.jsDump.parse(actual);
}

function equal(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.equal.call(this, actual, expected, message);
}

function strictEqual(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.strictEqual.call(this, actual, expected, message);
}

/**
 * Current Route
 * 
 * Compare the given route name with the route of the active
 * handler and assert that they are equal.
 * 
 * @param  {string} routeName The name of the route (i.e. 'posts.new')
 * @param  {string} message
 */
function currentRoute(routeName, message) {
  var container = isolatedContainer([
        'router:main'
      ]),
      router = container.lookup('router:main'), //get the main router
      currentHandlerInfos = router.router.currentHandlerInfos, //get all handlers
      activeHandler = currentHandlerInfos[currentHandlerInfos.length - 1], // get active handler
      activeRoute = activeHandler.handler.get('routeName');

  message = getAssertionMessage( activeRoute, routeName, message );
  QUnit.equal.call( this, activeRoute, routeName, message );
}

window.exists = exists;
window.equal = equal;
window.strictEqual = strictEqual;
