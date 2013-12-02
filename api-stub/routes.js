module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
    server.namespace('/api', function() {

        ///////////////////
        // for post model
        // 
        var post1 = {
                    "id": 1,
                    "title": "Rails is omakase",
                    "body": "There are lots of à la carte software environments in this world...",

                    "comments": ["1", "2"],
                    "user" : "dhh"
        };

        var post2 = {
                    "id": 2,
                    "title": "Ember is for ambitious web applications",
                    "body": "Ember.js is built for productivity. Designed with developer ergonomics in mind...",
                    "comments": ["3"],
                    "user" : "wycats"
        };

        var comment1 = { "id": 1, "body": "Rails is unagi"};
        var comment2 = { "id": 2, "body": "Omakase O_o"};
        var comment3 = { "id": 3, "body": "More than just a few sprinkles of javascript"};

        // For embedded records
        var postRecord1 = { "post": post1, "comments": [comment1, comment2] };
        var postRecord2 = { "post": post2, "comments": [comment3] };

        var postsCollection = {
            "posts": [post1, post2]
        };

        // Return fixture data for posts collection 
        // '/api/posts/'
        server.get('/posts/', function(req, res) {
            res.send(postsCollection);
        });


        // Return fixture data for individual post records 
        // '/api/posts/:id'
        server.get('/posts/:id', function(req, res) {
            var id = req.params.id;
            var defaultPost = post1;
            defaultPost['id'] = id; // Set an arbitrary id to simulate real identity map

            var post = defaultPost;
            switch(id)
            {
                case "1":
                  post = post1;
                  break;
                case "2":
                  post = post2;
                  break;
                default:
                  post = defaultPost;
            }

            var record = {"post": post};
            res.send(record);
        });

        ///////////////////
        // for comment model
        // 
        // Return fixture data for individual post records 
        // '/api/comments/:id'
        server.get('/comments/:id', function(req, res) {
            var id = req.params.id;
            var defaultComment = comment1;
            defaultComment['id'] = id; // Set an arbitrary id to simulate real identity map

            var comment = defaultComment;
            switch(id)
            {
                case "1":
                  comment = comment1;
                  break;
                case "2":
                  comment = comment2;
                  break;
                case "3":
                  comment = comment3;
                  break;
                default:
                  comment = defaultComment;
            }

            var record = {"post": comment};
            res.send(record);
        });



        ///////////////////
        // for color model
        // 
        var black   = { "id": 0, "name": "black", "hex": "#000000", "rgb": "rgb(0,0,0)"};
        var red     = { "id": 1, "name": "red", "hex": "#FF0000", "rgb": "rgb(255,0,0)"};
        var green   = { "id": 2, "name": "green", "hex": "#00FF00", "rgb": "rgb(0,255,0)"};
        var blue    = { "id": 3, "name": "blue", "hex": "#0000FF", "rgb": "rgb(0,0,255)"};
        var yellow  = { "id": 4, "name": "yellow", "hex": "#FFFF00", "rgb": "rgb(255,255,0)"};


        var colorsCollection = {
            "colors": [red, green, blue]
        };

        // Return fixture data for colors collection 
        // '/api/colors/'
        server.get('/colors/', function(req, res) {
            res.send(colorsCollection);
        });

        // Return fixture data for individual color records 
        // '/api/colors/:id'
        server.get('/colors/:id', function(req, res) {
            var id = req.params.id;
            var defaultColor = black;
            defaultColor['id'] = id; // Set an arbitrary id to simulate real identity map

            var color = defaultColor;
            switch(id)
            {
                case "1":
                  color = red;
                  break;
                case "2":
                  color = green;
                  break;
                case "3":
                  color = blue;
                  break;
                default:
                  color = defaultColor;
            }

            var record = {"color": color};
            res.send(record);
        });


    });

};