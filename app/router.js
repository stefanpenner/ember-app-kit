var Router = Ember.Router.extend();

Router.map(function(){
  this.resource('posts', function() {
    this.route('new');
  });
});

export default Router;
