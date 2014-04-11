export default {
  name: "injectStoreIntoComponent",
  after: "store",

  initialize: function(container, application) {
    container.typeInjection('component', 'store', 'store:main');
  }
};
