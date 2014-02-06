---
layout: default
title: "Testing with Testem"
permalink: testing.html
---

### Writing a Test

* ember-testing
* helpers
* unit/acceptance

The default tests in Ember App Kit use the [QUnit](http://qunitjs.com/) library.
The included tests demonstrate how to write both unit tests and
acceptance/integration tests using the new [ember-testing package](http://ianpetzer.wordpress.com/2013/06/14/getting-started-with-integration-testing-ember-js-using-ember-testing-and-qunit-rails/).

To run the tests in your browser using the QUnit interface, run `grunt server`
and navigate to `http://0.0.0.0:8000/tests`. Note that just like your app, your
tests will auto rebuild when `grunt server` is running.

{% highlight sh %}
grunt test
{% endhighlight %}

#### Testem

The app kit comes with a premade configuration file for running tests in
[Testem](https://github.com/airportyh/testem). By default, your app has four
tasks for testing:

* `grunt test` runs your apps's tests once. Uses Google Chrome by default. It
outputs code coverage information to the terminal.
* `grunt test:ci` runs your app's tests in [PhantomJS](http://phantomjs.org/).
For use in continuous integration (i.e. Travis CI).
* `grunt test:browsers` runs your app's tests in multiple browsers
(see tasks/options/testem.js for configuration).
* `grunt test:server` alias to `testem:run:basic`. Be sure to install testem
first using `npm install -g testem`. It will automatically watch and rebuild
your application on changes. It will also rerun your tests automatically when
your code is updated. Unlike running the tests directly through the QUnit page,
however, test results are output in the terminal and not the browser.

To modify these tests (including the browser used), edit `tasks/options/testem.js`.

#### Travis CI
