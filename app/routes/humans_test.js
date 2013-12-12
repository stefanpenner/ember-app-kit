export default Ember.Route.extend({
  model: function() {
    return ic.ajax('humans.txt').then(function(result){
      return result.response;
    }, Ember.RSVP.rethrow);
  }
});