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

/******************************************************************************************
 * Test Helpers from Canary
 *
 * TODO: Remove once ember-testing-routing-helpers is in a release build (hopefully 1.4.0)
 ******************************************************************************************/
var get = Ember.get,
    helper = Ember.Test.registerHelper;

function currentRouteName(app){
  var appController = app.__container__.lookup('controller:application');

  return get(appController, 'currentRouteName');
}

function currentPath(app){
  var appController = app.__container__.lookup('controller:application');

  return get(appController, 'currentPath');
}

function currentURL(app){
  var router = app.__container__.lookup('router:main');

  return get(router, 'location').getURL();
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
helper('currentRouteName', currentRouteName);

/**
    Returns the current path.

    Example:

    ```
    function validateURL(){
      equal(currentPath(), 'some.path.index', "correct path was transitioned into.");
    }

    click('#some-link-id').then(validateURL);

    ```

    @method currentPath
    @return {Object} The currently active path.
  */
  helper('currentPath', currentPath);

  /**
    Returns the current URL.

    Example:

    ```
    function validateURL(){
      equal(currentURL(), '/some/path', "correct URL was transitioned into.");
    }

    click('#some-link-id').then(validateURL);

    ```

    @method currentURL
    @return {Object} The currently active URL.
  */
  helper('currentURL', currentURL);
