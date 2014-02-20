import { test, asyncTest, moduleForModel } from 'appkit/tests/helpers/module_for';
import Post from 'appkit/models/post';

moduleForModel('post', '', {
    needs: ['model:comment']
});

asyncTest("Post is a valid ember-data Model", function () {
  var store = this.store();
  Em.run(function (){
    store.find('post', 1).then(function (post) {
      ok(post);
      ok(post instanceof DS.Model);
      ok(post instanceof Post);
      start();
    });
  });
});

asyncTest("the store is able to retrieve the fixture data", function () {
  var store = this.store();
  Em.run(function (){
    store.find('post', 1).then(function (post) {
      ok(post);
      equal(post.get('title'), "Rails is omakase");
      equal(post.get('user'), 'dhh');
      start();
    });
  });
});
