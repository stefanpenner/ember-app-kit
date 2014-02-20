import { test , asyncTest, moduleForModel } from 'appkit/tests/helpers/module_for';
import Comment from 'appkit/models/comment';

moduleForModel('comment', '', {
  needs: ['model:post']
});

asyncTest("comment is a valid ember-data Model", function () {
  var store = this.store();
  Em.run(function (){
    store.find('comment', 1).then(function (comment) {
      ok(comment);
      ok(comment instanceof DS.Model);
      ok(comment instanceof Comment);
      start();
    });
  });
});

asyncTest("the store is able to retrieve the fixture data", function () {
    var store = this.store();
    Em.run(function (){
        store.find('comment', 1).then(function (comment) {
            ok(comment);
            equal(comment.get('body'), "Rails is unagi");
            start();
        });
    });
});
