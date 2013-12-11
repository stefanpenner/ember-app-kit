import Resolver from 'resolver';

function isolatedContainer(fullNames) {
  var container = new Ember.Container();

  container.optionsForType('component', { singleton: false });
  container.optionsForType('view', { singleton: false });
  container.optionsForType('template', { instantiate: false });
  container.optionsForType('helper', { instantiate: false });
  
  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: 'appkit'
  };

  for (var i = fullNames.length; i > 0; i--) {
    var fullName = fullNames[i - 1];
    container.register(fullName, resolver.resolve(fullName));
  }

  return container;
}

export default isolatedContainer;
