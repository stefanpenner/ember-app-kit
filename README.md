# App Kit

## Goal
To lay the foundation for all your ambitious apps.

The plan is for ember to provide a executable that allows for some project generation, this project
will be used to flush out what this default structure and tooling will be. This executable may end
up being [charcoal], [ember-tools], or even more likely hybrid of both. 

The primary goal thought is to solve todays developers needs, spark some good real-world discussion, 
which will hopefully lead to some great additions and contributions.

## What does it do today:

- relatively sane project structure
- es6-modules
- module system aware resolver (no more imports, just wonderful convention over configuration magic)
- simple ember-testing example
- browser test
- headless tests
- jshint
 
## What does it clearly need to still do
- **** reduce the hacks needed to make this work ****
- remove rubygems sass dependency
- use the new es6 module syntax
- es6 aware jshint
- project compilation and minification
- source maps
- many small hacks and inconsistencies
- test should optionally require only specific modules via param (e.g ?module=user_package)
- simpler for generators to use (templitify the namespace name)

Please note Several ember shortcomings will also need to be addressed mostly just that the container needs
to be flushed through the framework. 

## what else does it need to do

I am not sure, make and issue, and lets have a great commuity discussion

## Running an app

1. Install node.js from http://nodejs.org
2. Run `npm install` inside the project directory
3. Install `grunt-cli` globally: `npm -g install grunt-cli`
4. Install sass: `gem install sass` (hopefully you already have Ruby and Rubygems installed)
5. Run `grunt server` to get a local development server running
6. The app will be running at http://0.0.0.0:8000

## Running headless tests
1. follow 1 through 4 of the "running an app" guide
2. grunt test

## Running browser tests
1. follow 1 through 5 of the "running an app" guide
2. the tests will be running at http://0.0.0.0:8000/tests
