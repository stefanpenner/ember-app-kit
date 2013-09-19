---
layout: default
title: "Using With Ember Data"
permalink: ember-data.html
---

Ember Data has recently undergone a major reboot, drastically simplifying it and making it easier to use with the Ember resolver. Here's some tips for using it within Ember App Kit.

### Adding it as a dependency

To add Ember Data as a dependency, you'll need to add it as a dependency, as described in [Managing Dependencies](/guides/dependencies.html). The TL;DR of it:

* `bower install --save http://builds.emberjs.com/beta/ember-data.js`

* In your `index.html` in *both* your `public/` and `tests/` folders, add Ember Data as a script:

{% highlight html %}
<head>
  <!-- build:js(.) assets/vendor.min.js -->
  <!-- ... -->
  <script src="/vendor/ember-data/index.js"></script>
  <!-- endbuild -->
</head>
{% endhighlight %}

By placing it within the `vendor` usemin block, it will automatically be added to your `assets/vendor.min.js` file in your final output.

* *(optional)* for Karma testing, add `/vendor/ember-data/index.js` to the `files` array in `karma.conf.js`.

### Adapters & Serializers

Ember Data makes heavy use of *per-type* adapters and serializers. These objects can be resolved like any other.

Adapters can be placed at `/app/adapters/type.js`:

{% highlight js %}
// adapters/post.js
var PostAdapter = DS.RESTAdapter.extend({
});

export default PostAdapter;
{% endhighlight %}

And its serializer can be placed in `/app/serializers/type.js`:

{% highlight js %}
// serializers/post.js
var PostSerializer = DS.RESTSerializer.extend({
});

export default PostSerializer;
{% endhighlight %}

Application-level (default) adapters and serializers should be named `adapters/application.js` and `serializers/application.js`, respectively.
