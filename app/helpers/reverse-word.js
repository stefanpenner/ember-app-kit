export default Ember.Handlebars.makeBoundHelper(function(word) {
  return word.split('').reverse().join('');
});
