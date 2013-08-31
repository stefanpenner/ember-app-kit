# Ember App Kit [![Build Status](https://travis-ci.org/stefanpenner/ember-app-kit.png?branch=master)](https://travis-ci.org/stefanpenner/ember-app-kit)
The goal Ember App Kit is to be the foundation for your ambitious web applications built in Ember. It's intended to be used either on its own or as the base scaffolding for generators built on for Ember applications, including [Ember Tools](https://github.com/rpflorence/ember-tools), [generator-ember](https://github.com/yeoman/generator-ember), and a hypothetical official executable at some point in the future.

This project has been extracted out of several real world applications, and is actively used. Currently it covers the basics fairly well, but much still needs to be done. As we learn and as more contributors join in it continues to evolve. So if you notice something that seems lame, it likely is, so submit an issue or PR!

We welcome ideas and experiments. 

### List of Active Experiments
-  CJS aligned branch [https://github.com/stefanpenner/ember-app-kit/tree/cjs]
-  es6-transpiler-v2 branch [https://github.com/stefanpenner/ember-app-kit/tree/es6-transpiler-v2]

For usage information, please see the [getting started guide](https://github.com/stefanpenner/ember-app-kit/wiki/Getting-Started).

## Features

- (relatively) Sane project structure
- ES6 module transpiler support (easy, future-proof modules)
- Module system-aware resolver
- Simple ember-testing example
- Testing via QUnit, Ember Testing, and Karma
- Linting source via JSHint (including module syntax)
- Project compilation & minification for easy deploys
- Catch-all index.html for easy reloading of pushState router apps
- Optional CoffeeScript, SASS, and LESS support
- Optional support for package management via [bower](https://github.com/bower/bower)

## Future goals

- Source maps for transpiled modules
- Better support for usage in generators
- easier to install 3rd party packages
- faster more intelligent builds

Think anything else is missing? Feel free to open an issue (or, even better, a PR)! Discussion and feedback is always appreciated.


## Special Thanks

Some ideas in ember-app-kit originated in work by Yapp Labs (@yapplabs) with McGraw-Hill Education Labs (@mhelabs)
on [yapplabs/glazier](https://github.com/yapplabs/glazier).
Thanks to Yapp and MHE for supporting the Ember ecosystem!
