var Comment = DS.Model.extend({
  body: DS.attr('string')
});

Comment.reopenClass({
  FIXTURES:
    [{
      "id": "1",
      "body": "Rails is unagi"
    }, {
      "id": "2",
      "body": "Omakase O_o"
    }]
});

export default Comment;