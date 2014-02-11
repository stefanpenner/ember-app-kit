export default Ember.Component.extend({
  classNames: ['pretty-color'],
  attributeBindings: ['style'],
  style: function(){
    return 'color: ' + this.get('name') + ';';
  }.property('name'),
  actions:{
    changeName: function(color) {
      this.set('name', color);
    }
  }
});
