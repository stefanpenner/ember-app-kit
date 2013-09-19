---
layout: default
title: "Getting Started"
permalink: getting-started.html
---

While Ember App Kit is powerful and easy once you get the hang of it, getting started with it isn't the most intuitive process for most developers. This guide will ease you into developing your application using EAK.

### Installing

The easiest way to create a new project with Ember App Kit is to simply [download it as a zip](https://github.com/stefanpenner/ember-app-kit/archive/master.zip). You can also `git clone` the repo, though you'll want to `rm -r .git` to remove its Git history.

Once you have the template, you'll need to install its dependencies. Ember App Kit's primary build tool is [Grunt](http://gruntjs.com), a build tool written in Node.js. If you don't already have Node installed, you can get it from [nodejs.org](http://nodejs.org/) or your package manager of choice (including [Homebrew](http://brew.sh/) on OSX).

Once you've installed Node, you'll need to install the Grunt command-line tool globally with:

{% highlight sh %}
npm install -g grunt-cli
{% endhighlight %}

This will give you access to the `grunt` command-line runner.

Next, in the folder for your new project, run:

{% highlight sh %}
npm install
{% endhighlight %}

This will install the dependencies Grunt relies on to build. These dependencies are primarily various Grunt tasks that do everything from module compilation to test running.

Before running your app for the first time, you'll want to install [Bower](http://bower.io), a package manager that keeps your front-end dependencies (including JQuery, Ember, and QUnit) up to date. This is as easy as running:

{% highlight sh %}
npm install -g bower
bower install
{% endhighlight %}

For more information on Bower, see the guide on [managing dependencies](dependencies.html)

Once your dependencies are installed, you should be able to simply run:

{% highlight sh %}
grunt server
{% endhighlight %}

and navigate to [http://0.0.0.0:8000](http://0.0.0.0:8000) to see your new app in action.

### Developing using Ember App Kit

#### Using Grunt

The development workflow for EAK is centered around Grunt, the build tool mentioned above. Grunt is simply a *task runner*, that is, it runs various tasks to handle your build pipeline. Unlike a build tool like Rake, which is usually used to write custom tasks configured for an application, Grunt primarily uses generic tasks that are configured through simple, generic JSON configuration. 

If you'd like to peek into the innards of Ember App Kit's build pipeline, you can pop open the `Gruntfile.js` to see the exact order of execution in each task, along with the individual task configuration in the `tasks/options` folder. To get started, though, you only need to know a few easy commands:

* `grunt` - The default command builds your application (in *debug* mode) and runs its tests.
* `grunt server` - As you saw above, this command builds your application (in *debug* mode) and serves it. This task also will *watch* your application for changes, and will rebuild any time you change a file.
* `grunt build:debug` - Builds your application once in *debug* mode. This will output your app in `tmp/public`.
* `grunt build:dist` - Builds your application once in *dist* mode. This means your assets will be minified and version-stamped. This task also builds to the `dist/` folder, which can be deployed to a static server in production.
* `grunt server:dist` - Same as above, but also launches a preview server for your optimized output.

#### Testing your application

#### Writing modules

### Next Steps


