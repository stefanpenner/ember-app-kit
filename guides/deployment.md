---
layout: default
title: "Deploying Your App"
permalink: "deployment.html"
---
### Deploying to Heroku 
Ember App Kit can be easily deployed to Heroku by using [Heroku's official Node.js buildpack](https://github.com/heroku/heroku-buildpack-nodejs). Just include `grunt-cli` in your `devDependencies` and add `grunt build:dist` to your `postinstall`.
