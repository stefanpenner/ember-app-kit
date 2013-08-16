Ember.keys(requirejs._defined).filter(function(key) {
  return (/\_test/).test(key);
}).forEach(require);
