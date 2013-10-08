---
layout: default
title: "Naming Conventions"
permalink: naming-conventions.html
---

When using Ember App Kit its important to keep in mind that the Resolver changes some of the naming conventions you would typically use out of the box with Ember, Ember Data and Handlebars. In this section we review some of these naming conventions.

### Views and Templates

Lets say we were using Ember out of the box with the following view:

{% highlight sh %}
App.UserView = Ember.View.extend({});
{% endhighlight %}

We could easily embed this view into a container/parent using the Handlebars view helper:

{% highlight sh %}
{% raw %}
{{ view App.UserView }}
{% endraw %}
{% endhighlight %}

This is great. However, in Ember App Kit we use a Resolver to alleviate the issue of namespacing your views, controllers, models, etc... So the above example would not work.

In EAK our view would be declared like so:

{% highlight sh %}
var UserView = Ember.View.extend({});

export default UserView;
{% endhighlight %}

We can then embed our view using the following convention:

{% highlight sh %}
{% raw %}
{{view 'userview'}}
{% endraw %}
{% endhighlight %}

> Please note that we did not namespace UserView. The resolver takes care of this for you.

### Filenames

It is important to keep in mind that the Resolver uses filenames to create the associations correctly. This helps you by not having to namespace everything yourself. But there a couple of things you should know.

*   Name files all in lowercase (e.g. views/user.js, models/user.js, controller/index.js )
*   There is no need to name files according to their relationship (e.g usercontroller.js, usermodel.js or indexcontroller.js)
