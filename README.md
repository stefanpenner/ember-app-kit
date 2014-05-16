# Ember App Kit [![Build Status](https://travis-ci.org/stefanpenner/ember-app-kit.png?branch=master)](https://travis-ci.org/stefanpenner/ember-app-kit)

Ember App Kit aims to be the foundation for ambitious web applications built with Ember. It will soon be replaced by an executable [ember-cli](https://github.com/stefanpenner/ember-cli) which dramatically improves buildtimes (via broccoli) and provides sane-upgrade paths, feel free to check that project out. We intend to provide a sensible upgrade path.

This project has been extracted out of several real world applications and is actively used. Currently it covers the basics fairly well, but much still needs to be done. As we learn and as more contributors join in it continues to evolve. If you encounter any bugs, clunky features or missing documentation, just submit an issue and we'll respond ASAP.

At the very least, it helps setup your Ember.js applications directory structure.

We welcome ideas and experiments.

## Getting Started

* [Project Documentation Site](http://stefanpenner.github.io/ember-app-kit/)
* [Getting Started Guide](http://stefanpenner.github.io/ember-app-kit/guides/getting-started.html)
* [ember-app-kit-todos](https://github.com/stefanpenner/ember-app-kit-todos) - the Emberjs [todos](http://emberjs.com/guides/getting-started/) using Ember App Kit 
* [ember-app-kit-bloggr](https://github.com/pixelhandler/ember-app-kit-example-with-bloggr-client) - bloggr demo
* *Safari Books Online Blog* - [Introduction to Ember App Kit](http://blog.safaribooksonline.com/2013/09/18/ember-app-kit/) for more experienced Ember developers by @mixonic
* *Ember Sherpa* - [Introduction to Ember App Kit](http://embersherpa.com/articles/introduction-to-ember-app-kit/) for those who are new to the Grunt workflow by @taras 


## Features

- Sane project structure
- ES6 module transpiler support (easy, future-proof modules)
- Module system-aware resolver (see [Referencing views](https://github.com/stefanpenner/ember-app-kit/wiki/Referencing-Views) and [Using Ember loaders](https://github.com/stefanpenner/ember-app-kit/wiki/Using-Ember-loaders))
- Transparent project compilation & minification for easy deploys via [Grunt](http://gruntjs.com/)
- Package management via [Bower](https://github.com/bower/bower)
- Optional support for CoffeeScript, SASS, LESS or Stylus
- Testing via QUnit, Ember Testing and Testem (with examples)
- Linting via JSHint (including module syntax)
- Catch-all `index.html` for easy reloading of pushState router apps
- Generators via [Loom](https://github.com/cavneb/loom-generators-ember-appkit) (to generate routes, controllers, etc.)

## Future Goals

- Source maps for transpiled modules
- Easier to install 3rd party packages
- Faster, more intelligent builds

Think anything else is missing? Feel free to open an issue (or, even better, a PR)! Discussion and feedback is always appreciated.

## Migrating to Ember CLI

First, install ember-cli with `npm install -g ember-cli`. Now, on top of
your EAK project, run `ember init`. Ember CLI will begin to migrate your
project. You may diff the files it overwrites as it goes along. A
detailed list will be provided next to help you along, but first, feel free to remove the
Gruntfile and the tasks directory since we won't be needing them
anymore.

`rm Gruntfile.js && rm -rf tasks`


* tests/.jshintrc
  * Let ember-cli overwrite this
* app/index.html
  * Let ember-cli overwrite this
* app/app.js
  * app/app.js
* app/router.js
  * The only change here is that the Router's location is now handled by
    the config. Change this to ENV.locationType if you need to.
* app/routes/index.js
  * This will attempt to replace your IndexRoute with a stub. Don't let
    it override this file.
* Brocfile.js
  * This essentially replaces your Gruntfile. Let ember-cli add this file.
* app/templates/application.hbs
  * This will attempt to replace your application template with a stub.
    It will also add it if you are using Emblem. You can safely skip
    this step.
* app/styles/app.css
  * This will attempt to replace your app style with a stub. You can
    safely skip this step.
* tests/index.html
  * Let ember-cli add this file.

You may get errors about files not existing. You'll have to refresh your dependencies by removing the `node_modules`
directory, clearing the cache, and rerunning npm & bower install.


### Tests

* Tests for JSHint are now auto-generated

#### Acceptance Tests

* Create a `tests/acceptance` directory
* Import `tests/helpers/start-app` into each test file.
  * `import startApp from 'your-app/tests/helpers/start-app`
* Import testing dependencies
  * Instead of using your app/index.html file, these can now be imported
    from the Brocfile.
    * For example, `app.import('/vendor/ember-data/ember-data.js')`
  * If you were using ember-testing-httpRespond
    * This is now patched for 1.4+
    * Import it and its dependencies in your Brocfile by using
      `app.import()`

#### Unit tests

* Copy your unit tests into the `tests/unit` directory.

## Special Thanks

Some ideas in ember-app-kit originated in work by Yapp Labs (@yapplabs) with McGraw-Hill Education Labs (@mhelabs) on [yapplabs/glazier](https://github.com/yapplabs/glazier). Thanks to Yapp and MHE for supporting the Ember ecosystem!

## License

Copyright 2013 by Stefan Penner and Ember App Kit Contributors, and licensed under the MIT License. See included
[LICENSE](/stefanpenner/ember-app-kit/blob/master/LICENSE) file for details.
