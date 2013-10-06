# Ember App Kit [![Build Status](https://travis-ci.org/stefanpenner/ember-app-kit.png?branch=master)](https://travis-ci.org/stefanpenner/ember-app-kit)

Ember App Kit aims to be the foundation for ambitious web applications built with Ember. It's intended to be used either on its own or as the base scaffolding for projects using [Ember Tools](https://github.com/rpflorence/ember-tools), [generator-ember](https://github.com/yeoman/generator-ember) and a hypothetical official executable at some point in the future.

This project has been extracted out of several real world applications and is actively used. Currently it covers the basics fairly well, but much still needs to be done. As we learn and as more contributors join in it continues to evolve. If you encounter any bugs, clunky features or missing documentation, just submit an issue and we'll respond ASAP.

We welcome ideas and experiments.

## Getting Started

* [Project Documentation Site](http://stefanpenner.github.io/ember-app-kit/)
* [Getting Started Guide](http://stefanpenner.github.io/ember-app-kit/guides/getting-started.html)
* [ember-app-kit-todos](https://github.com/stefanpenner/ember-app-kit-todos) - the Emberjs [todos](http://emberjs.com/guides/getting-started/) using Ember App Kit 
* *Safari Books Online Blog* - [Introduction to Ember App Kit](http://blog.safaribooksonline.com/2013/09/18/ember-app-kit/) for more experienced Ember developers by @mixonic
* *Ember Sherpa* - [Introduction to Ember App Kit](http://embersherpa.com/articles/introduction-to-ember-app-kit/) for those who are new to the Grunt workflow by @taras 


## Features

- Sane project structure
- ES6 module transpiler support (easy, future-proof modules)
- Module system-aware resolver (see [Referencing views](https://github.com/stefanpenner/ember-app-kit/wiki/Referencing-Views) and [Using Ember loaders](https://github.com/stefanpenner/ember-app-kit/wiki/Using-Ember-loaders))
- Transparent project compilation & minification for easy deploys via [Grunt](http://gruntjs.com/)
- Package management via [Bower](https://github.com/bower/bower)
- Optional support for CoffeeScript, SASS, LESS or Stylus
- Testing via QUnit, Ember Testing and Karma (with examples)
- Linting via JSHint (including module syntax)
- Catch-all `index.html` for easy reloading of pushState router apps

## Future Goals

- Source maps for transpiled modules
- Better support for Ember generators
- Easier to install 3rd party packages
- Faster, more intelligent builds

Think anything else is missing? Feel free to open an issue (or, even better, a PR)! Discussion and feedback is always appreciated.

## Special Thanks

Some ideas in ember-app-kit originated in work by Yapp Labs (@yapplabs) with McGraw-Hill Education Labs (@mhelabs) on [yapplabs/glazier](https://github.com/yapplabs/glazier). Thanks to Yapp and MHE for supporting the Ember ecosystem!
