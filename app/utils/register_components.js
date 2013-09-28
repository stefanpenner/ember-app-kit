/* global requirejs */
/* global require */

function registerComponents(container) {
  var seen = requirejs._eak_seen;
  var templates = seen, match;
  if (!templates) { return; }

  for (var prop in templates) {
    if (match = prop.match(/templates\/components\/(.*)$/)) {
      require(prop, null, null, true);
      registerComponent(container, match[1]);
    }
  }
}


function registerComponent(container, name) {
  Ember.assert("You provided a template named 'components/" + name + "', but custom components must include a '-'", name.match(/-/));

  var fullName         = 'component:' + name,
      templateFullName = 'template:components/' + name;

  container.injection(fullName, 'layout', templateFullName);

  var Component = container.lookupFactory(fullName);

  if (!Component) {
    container.register(fullName, Ember.Component);
    Component = container.lookupFactory(fullName);
  }

  Ember.Handlebars.helper(name, Component);
}

export default registerComponents;
