Router = Ember.Router.extend() # ensure we don't share routes between all Router instances

Router.map ->
  this.route 'component-test'
  # this.resource 'posts', ->
  #   this.route'new'

`export default Router`
