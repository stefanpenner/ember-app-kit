var Post = DS.Model.extend({
  title: DS.attr('string'),
  user: DS.attr('string'),
  comments: DS.hasMany('comment')
});

Post.reopenClass({
  FIXTURES: [{
    "id": 1,
    "title": "Rails is omakase",
    "comments": ["1", "2"],
    "user" : "dhh"
  }]
});

export default Post;