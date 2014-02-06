---
layout: default
title: "Testing with Karma"
permalink: testing.html
---

### Writing a Test

* ember-testing
* helpers
* unit/acceptance

The default tests in Ember App Kit use the [QUnit](http://qunitjs.com/) library. The included tests demonstrate how to write both unit tests and acceptance/integration tests using the new [ember-testing package](http://ianpetzer.wordpress.com/2013/06/14/getting-started-with-integration-testing-ember-js-using-ember-testing-and-qunit-rails/).

To run the tests in your browser using the QUnit interface, run `grunt server` and navigate to `http://0.0.0.0:8000/tests`. Note that just like your app, your tests will auto rebuild when `grunt server` is running.

{% highlight sh %}
grunt test
{% endhighlight %}

#### Karma

The app kit comes with a premade configuration file for running tests in [Karma](http://karma-runner.github.io/0.8/index.html). Karma is a test runner developed by Google for easier cross-browser testing. By default, your app has three tasks for testing:

* `grunt test` runs your application's tests once using Google Chrome. It outputs code coverage information to the terminal and in `tmp/public/coverage`.
* `grunt test:ci` runs your tests in [PhantomJS](http://phantomjs.org/), and is intended primarily for running on a CI server (such as Travis CI).
* `grunt test:server` is similar to `grunt server` in that it will automatically watch and rebuild your application on changes. It will also rerun your tests automatically when your code is updated. Unlike running the tests directly through the QUnit page, however, test results are output in the terminal and not the browser.

To modify these tests (including the browser used), edit `tasks/options/karma.js`.

#### Travis CI
