document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;

var resolver = require('appkit/tests/helpers/resolver')['default'];
var emberQunit = require('ember-qunit');

emberQunit.setResolver(resolver);
emberQunit.globalize();

window.startApp          = require('appkit/tests/helpers/start-app')['default'];
window.isolatedContainer = require('ember-qunit/isolated-container')['default'];

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
