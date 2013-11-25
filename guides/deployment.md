---
layout: default
title: "Deploying Your App"
permalink: "deployment.html"
---
### Heroku 
Ember App Kit can be easily deployed to Heroku using Express. For better performance we should be using nginx since we are only serving static files, but for a quick demo this could be useful.

Assuming you have heroku toolbelt installed...

From the ROOT of your EAK project create a new Heroku app and add 1 web worker
{% highlight sh %}
heroku apps:create ember-app-kit 
heroku ps:scale web=1
{% endhighlight %}

Next, we need to modify our `package.json` to include necessary dependencies. Your dependencies might look something like this
{% highlight sh %}
"dependencies": {
  "express": "~3.4.2",
  "lockfile": "~>0.3.0",
  "bower": "~1.2.7",
  "grunt": "~0.4.1",
  "grunt-cli": "~0.1.9",
  "load-grunt-config": "~0.5.0", 
  "grunt-contrib-watch": "~0.5.3",
  "grunt-contrib-copy": "~0.4.1",
  "grunt-contrib-concat": "~0.3.0",
  "grunt-contrib-clean": "~0.4.1",
  "grunt-contrib-jshint": "~0.6.2",
  "grunt-contrib-uglify": "~0.2.2",
  "grunt-contrib-cssmin": "~0.6.1",
  "grunt-preprocess": "~3.0.1",
  "grunt-es6-module-transpiler": "~0.5.1",
  "grunt-concat-sourcemap": "~0.3.0",
  "grunt-concurrent": "~0.3.1",
  "grunt-usemin": "~0.1.12",
  "grunt-rev": "~0.1.0",
  "grunt-ember-templates": "~0.4.17",
  "grunt-karma": "~0.5",
  "grunt-contrib-less": "~0.8.2"
},
{% endhighlight %}


Then add `grunt dist` to our postinstall in our `package.json` in order to build our application for production. 
{% highlight sh %}
"postinstall": "bower install; grunt dist"
{% endhighlight %}

Next, create a `Procfile` to the root of your project
{% highlight sh %}
web: ./node_modules/grunt-cli/bin/grunt expressServer:dist:keepalive
{% endhighlight %}

Finally, `git push heroku master` to deploy.
