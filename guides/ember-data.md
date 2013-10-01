---
layout: default
title: "Using With Ember Data"
permalink: ember-data.html
---

The current beta Ember Data is now included with Ember App Kit.

Ember Data has recently undergone a major reboot, drastically simplifying it and making it easier to use with the Ember resolver. Here's some tips for using it within Ember App Kit.

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
