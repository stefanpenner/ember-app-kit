---
layout: default
title: "Overview"
permalink: index.html
---

Ember App Kit (EAK) is a robust starter kit for developing applications in [Ember.js](http://emberjs.com). EAK makes it easy to develop, build, test, and deploy applications independent of any back-end build process.

### Asset Compilation

Ember App Kit is built around [Grunt](http://gruntjs.com), an extremely easy-to-use task runner built in Node.js. Grunt is the *de facto* build tool of the front-end world, and EAK uses its huge ecosystem of tasks for compiling all kinds of assets, including:

* Handlebars templates (or [Emblem](http://emblemjs.com/))
* [LESS](http://lesscss.org/) (or [SASS](http://sass-lang.com/), or [Compass](http://compass-style.org/), or [Stylus](http://learnboost.github.io/stylus/)...)
* [CoffeeScript](http://coffeescript.org/)
* Minified JS & CSS

All of this compilation happens in the background while you're developing, rebuilding each time you change a file.

### Modules

Ember App Kit uses the [ES6 Module Transpiler](https://github.com/square/es6-module-transpiler), which turns [ES6 module syntax](http://wiki.ecmascript.org/doku.php?id=harmony:modules#quick_examples) into AMD (RequireJS-style) modules. Using the transpiler, you can write code using tomorrow's syntax, today.

In the past, building an Ember application with any sort of module system required lots of manual wiring-up of pieces. With the custom resolver included in Ember App Kit, though, your modules are automatically used when needed. Your route in `routes/post.js` will know to use the controller in `controllers/post.js` and the template in `templates/post.hbs`. Of course, if your application does need to explicitly include a module, it's only an `import` statement away.

### Testing

All apps built with EAK are preconfigured to use [QUnit](http://qunitjs.com/), the [Ember Testing](http://emberjs.com/guides/testing/integration/) package, and the [Karma](http://karma-runner.github.io/0.10/index.html) test runner. These tools, along with the same module system as your application, make both unit and integration tests a breeze to write.

### Dependency Management

Ember App Kit uses the [Bower package manager](http://bower.io/), making it easy to keep your front-end dependencies up to date.

### And More

Ember App Kit is an ongoing community effort, and efforts continue to find the easiest ways to architect applications. We welcome your issues and PRs for features, bug fixes, and anything that would improve your quality of life as an Ember developer.

