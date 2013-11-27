// Please note that Handlebars helpers will only be found automatically by the
// resolver if their name contains a dash (reverse-word, translate-text, etc.)
// See, for more details: https://github.com/stefanpenner/ember-app-kit/wiki/Getting-Started#resolving-handlebars-helpers

export default Ember.Handlebars.makeBoundHelper(function(word) {
  return word.split('').reverse().join('');
});

