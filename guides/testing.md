---
layout: default
title: "Testing with Testem"
permalink: testing.html
---

### Writing a Test

The default tests in Ember App Kit use the [QUnit](http://qunitjs.com/) library.
The included tests demonstrate how to write both unit tests and
acceptance/integration tests using the new [ember-testing package](http://ianpetzer.wordpress.com/2013/06/14/getting-started-with-integration-testing-ember-js-using-ember-testing-and-qunit-rails/).

To run the tests in your browser using the QUnit interface, run `grunt server`
and navigate to `http://0.0.0.0:8000/tests`. Note that just like your app, your
tests will auto rebuild when `grunt server` is running.

{% highlight sh %}
grunt test
{% endhighlight %}


#### Unit Tests

Unit tests are meant to test small, focussed units of your code. For example,
you can test a single component, a single model etc. Keeping your units small
and focussed is a challenge, though, but using unit tests as a means to drive
your development process will improve the design (and testability) of your
code.

The challenge starts when you want to test a part of your software that depends
on another part. In these cases, writing your tests first will help you to keep
your unit focussed, and the interface to other units small and clear, as you
will have to stub all dependencies.

Let's for example test a post model which has an association with a comment
model. In this case, we need to stub out the association, in order to test the
post model in an isolated way.

{% highlight js %}
import { test , moduleForModel } from 'appkit/tests/helpers/module_for';
import Post from 'appkit/models/post';

Post.reopen({
  comments: [],
});

moduleForModel('post', 'Unit - PostModel');

test("is a Post instance", function() {
  ok(this.subject() instanceof Post);
});
{% endhighlight %}

The interaction between the model and the comment might still be tested in an
integration test, though.

Ember App Kit's unit test helpers (`moduleFor`, `moduleForModel`,
`moduleForComponent`) support the unit testing principle by only loading the
parts of your code under test. This means that the example above would fail
withouth the stubbing, because the definition of the associated model is not
loaded automatically, preventing Post instances from being created
successfully.

But you can still import other modules and register them in the testing
container. Just take a look at the definition of the `moduleFor` helper to get
an idea.


#### Acceptance Tests

Acceptance tests, in contrast to unit tests, test your full code stack. If that
code stack should include or exclude your API, is up to you. You can still stub
out your API in Ember Data by using fixtures, or use the [EAK built in API stub
server](mock-and-proxy-requests.html).

Ember App Kit makes it easy to get started with acceptance testing by using
[Ember
Testing](http://ianpetzer.wordpress.com/2013/06/14/getting-started-with-integration-testing-ember-js-using-ember-testing-and-qunit-rails/).
Your App will be loaded with testing mode enabled, and reset after each test
run. Basically, you navigate your browser to a url and interact with the page,
like you normally do while browsing. The acceptance test samples will show you
how to do just that.


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
