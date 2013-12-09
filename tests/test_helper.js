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

window.exists = exists;
window.equal = equal;
window.strictEqual = strictEqual;

/**
 * Test Helpers from Canary
 */
var get = Ember.get;

function currentRouteName(app){
  var appController = app.__container__.lookup('controller:application');

  return get(appController, 'currentRouteName');
}

/**
    Returns the currently active route name.

    Example:

    ```
    function validateRouteName(){
      equal(currentRouteName(), 'some.path', "correct route was transitioned into.");
    }

    visit('/some/path').then(validateRouteName)

    ```

    @method currentRouteName
    @return {Object} The name of the currently active route.
  */
Ember.Test.registerHelper('currentRouteName', currentRouteName);
