`import Resolver from 'resolver'`
`import registerComponents from 'appkit/utils/register_components'`

App = Ember.Application.extend
  LOG_ACTIVE_GENERATION: true
  LOG_MODULE_RESOLVER: true
  LOG_TRANSITIONS: true
  LOG_TRANSITIONS_INTERNAL: true
  LOG_VIEW_LOOKUPS: true
  modulePrefix: 'appkit'
  Resolver: Resolver

App.initializer
  name: 'Register Components',
  initialize: (container, application)->
    registerComponents container

`export default App`
