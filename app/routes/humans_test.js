export default Ember.Route.extend({
  model: function() {
    return ic.ajax('humans.txt');
  }
});