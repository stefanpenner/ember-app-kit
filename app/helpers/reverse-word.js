//
// Please note that Handlebars helpers will only be found by the resolver if their name contains
// a dash (reverse-word, translate-text, etc.)
//
// This is the result of a choice that was made in Ember, to help both disambiguate properties
// from helpers, and to mitigate the performance hit of helper resolution for all bindings.
//
// The other option is to load it explicitely like so:
//
// in app/helpers/example.js:
//
// var helperFunction = function(value, options) {
//    return value.toUpperCase();
// };
//
// in app.js:
//
// import exampleHelper from 'appkit/helpers/example';
// Ember.Handlebars.registerBoundHelper('example', exampleHelper);
//
// For more details, see issue #323 here:
// https://github.com/stefanpenner/ember-app-kit/issues/323
//

export default helperFunction;


export default Ember.Handlebars.makeBoundHelper(function(word) {
  return word.split('').reverse().join('');
});
