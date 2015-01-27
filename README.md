# Deprecated

this project has been deprecated in-favour of the ember-cli project:

* https://github.com/stefanpenner/ember-cli
* http://iamstef.net/ember-cli


## Migrating to Ember CLI

First, run `npm install -g ember-cli` to install Ember CLI.
Now, on top of your existing EAK project, run `ember init`. Ember CLI
will then migrate your project, showing you a diff of its overrides,
and letting you edit them, as it goes along.

### Ember Init Overrides

* tests/.jshintrc
* Let ember-cli overwrite this.
* app/index.html
* Since managing vendor assets is now handled via the Brocfile, you should let ember-cli overwrite this file.
* app/app.js
* Ember Configuration is now handled in the `config` directory.
* app/router.js
* The Router's location is now handled via environment configuration.
Change this to ENV.locationType.
* app/routes/index.js
* This will attempt to replace your Index Route with a stub. Usually,
you wont't want Ember CLI to override this file.
* Brocfile.js
* Move your dependencies from app/index.html into this file by calling
app.import().
* Example: app.import('vendor/ember-data/ember-data.js')
* app/templates/application.hbs
* This will attempt to replace your application template with a stub.
* app/styles/app.css
* Another stub.
* tests/index.html
* Let ember-cli add this file. Include any test depencies you had in `app/index.html'.
* bower.json
* package.json


## Ember CLI Migrator

The [Ember CLI Migrator](https://github.com/fivetanley/ember-cli-migrator) will help you migrate your files to the standard ember-cli structure while preserving your Git history. This tool will help get you 90% of the way there when working with an EAK app.

### Importing Ember and Ember Data

You now have to explicitly import Ember and Ember Data. Add `import Ember from "ember` and
`import DS from "ember-data"` anywhere you declared a route, controller, model, and so on.

### Migrating your API Stub

To work with the API stub again, run `ember generate api-stub`.
This command generates a server directory where you can then migrate your routes accordingly.

You may also want to look into [Ember CLI Rest API Blueprint](https://github.com/manuelmitasch/ember-cli-rest-api-blueprint)
which generates DS.RESTAdapter compatible express routes for a given Model.

### Using The Express Server

The Express server has been exposed and now lives under this directory.
You can now customize it any way you want, from enhancing the static file server,
to simply using it as an API stub. You may even develop it further and turn it into a full-stack solution.

### Cleanup

You can remove the Gruntfile and tasks folder since we won't be needing them anymore.

For now, you can check the [app blueprint](https://github.com/stefanpenner/ember-cli/tree/master/blueprints/app/files)
to see what other files you no longer need.

### Troubleshooting

* Ember CLI now picks up your app namespace. Change the import to
reference the name of your project.
* If you never changed your application namespace from the default
`appkit` then running `ember init` will break any import statements
you already have

* Index Route doesn't exist
* You may need to refresh your dependencies. Run `rm -rf npm_modules && npm install && npm
cache clean && bower install`

* Tests
* Import `tests/helpers/start-app` into each acceptance test file.
* `import startApp from 'your-app/tests/helpers/start-app`
* `resolver` and `startApp` still live in `test/helpers/` but
`module-for` is now its own package.
* If you were using ember-testing-httpRespond
* This is now patched for 1.4+
* Import it and its dependencies in your Brocfile by using
`app.import()`






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



## Special Thanks

Some ideas in ember-app-kit originated in work by Yapp Labs (@yapplabs) with McGraw-Hill Education Labs (@mhelabs) on [yapplabs/glazier](https://github.com/yapplabs/glazier). Thanks to Yapp and MHE for supporting the Ember ecosystem!

## License

Copyright 2013 by Stefan Penner and Ember App Kit Contributors, and licensed under the MIT License. See included
[LICENSE](/stefanpenner/ember-app-kit/blob/master/LICENSE) file for details.
