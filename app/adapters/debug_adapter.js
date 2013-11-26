/* global require */

export default DS.DebugAdapter.reopen({
  getModelTypes: function() {
    var self = this;
    return Ember.keys(require._eak_seen).filter(function(key) {
      return !!key.match(/^appkit\/models\//) && self.detect(require(key).default);
    }).map(function(key){
        var type = require(key).default, typeKey = key.match(/^appkit\/models\/(.*)/)[1];
        type.toString = function() { return typeKey; };
        return type;
      });
  }
});
