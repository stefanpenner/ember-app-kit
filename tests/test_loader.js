// TODO: load based on params
Ember.keys(define.registry).filter(function(key) {
  return (/\_test/).test(key);
}).forEach(requireModule);