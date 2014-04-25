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

#### Using moduleFor

Ember App Kit now includes a way to minimize what you have to load into the runtime during testing.  Included under the [helpers](https://github.com/stefanpenner/ember-app-kit/tree/master/tests/helpers) directory is the [module-for.js](https://github.com/stefanpenner/ember-app-kit/blob/master/tests/helpers/module-for.js).  This file provides convenience methods that will only load what is truly necessary for your test. 

* moduleFor
* moduleForModel
* moduleForComponent

##### moduleFor(fullName, description, callbacks, delegate) 

The generic resolver that will load what you specify.  The usage closely follows QUnit's own `module` function. Its use can be seen within the supplied [index-test.js](https://github.com/stefanpenner/ember-app-kit/blob/master/tests/unit/routes/index-test.js)

*Example*  

```JavaScript
moduleFor('route:index', "Unit - IndexRoute", {
  //needs: ['controller:index'],  only neccessary if you want to load other items into the runtime
  setup: function () {},
  teardown: function () {}
} );
```

`fullname`: The resolver friendly name of the object you are testing

`description`: The description that will group all subsequent tests under. Defaults to the `fullname`.

`callbacks`: You are able to supply custom setup, teardown, & subject functionality by passing them into the callbacks parameter.  If other objects should be loaded into Ember.js, specify the objects through the `needs` property.

`delegate`: To manually modify the container & the testing context, supply a function as the delegate matching this signature `delegate(container, testing_context)`


###### Within a moduleFor test

`this.subject()` calls the factory for the object specified by the fullname and will return an instance of the object

##### moduleForModel(name, description, callbacks)  

Extends the generic `moduleFor` with custom loading for testing models.

*Example*  

```JavaScript
import { test, moduleForModel } from 'appkit/tests/helpers/module-for';
import Post from 'appkit/models/post';
 
moduleForModel('post', 'Post Model', {
  needs: ['model:comment']
});
 
test("Post is a valid ember-data Model", function () {
  var post = this.subject({title: 'A title for a post', user: 'bob'});
  ok(post);
  ok(post instanceof DS.Model);
  ok(post instanceof Post);
});
```

`name`: The name of the model you are testing.  It is necessary to only supply the name, not the resolver path to the object.   `model:post` => `post`

`description`: The description that will group all subsequent tests under. Defaults to the `name`.

`callbacks`: You are able to supply custom setup, teardown, & subject functionality by passing them into the callbacks parameter.  If other objects should be loaded into Ember.js, specify the objects through the `needs` property.  __Note:__ If the model you are testing has relationships to any other model, those must be specified through the `needs` property.

###### Within a moduleForModel test

`this.store()` retrieves the `DS.Store`

`this.subject()` calls the factory for the `DS.Model` specified by the fullname and will return an instance of the object

##### moduleForComponent(name, description, callbacks)  

Extends the generic `moduleFor` with custom loading for testing components.

*Example*  

```JavaScript
import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';
 
moduleForComponent('pretty-color');
 
test("changing colors", function(){
  var component = this.subject();
 
  Ember.run(function(){
    component.set('name','red');
  });
 
  // first call to $() renders the component.
  equal(this.$().attr('style'), 'color: red;');
 
  Ember.run(function(){
    component.set('name', 'green');
  });
 
  equal(this.$().attr('style'), 'color: green;');
});
```

`name`: The name of the component you are testing.  It is necessary to only supply the name, not the resolver path to the object.   `component:pretty-color` => `pretty-color`

`description`: The description that will group all subsequent tests under. Defaults to the `name`.

`callbacks`: You are able to supply custom setup, teardown, & subject functionality by passing them into the callbacks parameter.  If other objects should be loaded into Ember.js, specify the objects through the `needs` property.

###### Within a moduleForComponent test

`this.subject()` calls the factory for the `Ember.Component` specified by the fullname and will return an instance of the object

The first call `this.$()` will render out the component.  So if you want to test styling, you must access the component via jQuery.  

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