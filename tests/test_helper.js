document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

window.startApp          = requireModule('appkit/tests/helpers/start_app');
window.isolatedContainer = requireModule('appkit/tests/helpers/isolated_container');

function exists(selector) {
  return !!find(selector).length;
}

function equal(actual, expected, message) {
  message = message || QUnit.jsDump.parse(expected) + " expected but was " + QUnit.jsDump.parse(actual);
  QUnit.equal.call(this, expected, actual, message);
}

window.exists = exists;
window.equal = equal;
