module.exports = function(server, namespace) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace(namespace, function() {

		// Return fixture data for '/api/posts/:id'
		server.get('/posts/:id', function(req, res) {
			var post = {
					  "post": {
					    "id": 1,
					    "title": "Rails is omakase",
					    "comments": ["1", "2"],
					    "user" : "dhh"
					  },

					  "comments": [{
					    "id": "1",
					    "body": "Rails is unagi"
					  }, {
					    "id": "2",
					    "body": "Omakase O_o"
					  }]
					};

			res.send(post);
		});

	});

};