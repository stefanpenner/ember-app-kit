// TypeScript compilation. This must be enabled by installing
// the the typescript grunt task, as described in the Gruntfile.js
//
// TypeScript has a very idiosyncratic (and in several ways immature)
// module system. This version of TypeScript support, in order to play
// nicely with the transpiled JavaScript, uses a special NamedAsynchronous
// module that modifies AMD modules to have names. This is not
// supported by the TypeScript compiler out of the box.
//
// TypeScript files should use the TypeScript module system, inspired
// by a ES6 module system draft:
//
// declare class Ember {
//   static Route: any;
// };
//
// var IndexRoute = Ember.Route.extend({
//   model: function() {
//     return ['red', 'yellow', 'blue'];
//   }
// });
//
// export = IndexRoute;
//
// And an example of a test that uses import:
//
// /// <reference path="../../../app/routes/index.ts"/>
// import Index = require('app/routes/index');
//
// declare var module: any;
// declare var test: any;
// declare var isolatedContainer: any;
// declare var ok: any;
// declare var Ember: any;
//
// var route: any;
//
// module("Unit - IndexRoute", {
//   setup: function(){
//     var container = isolatedContainer([
//       'route:index'
//     ]);
//     route = container.lookup('route:index');
//   }
// });
//
// test("it exists", function(){
//   ok(route);
//   ok(route instanceof Index);
// });
//
// The reference is required to allow the require statement
// to find a description of the module. This is what requires
// your app to have the same namespaces as the directory is
// calls home.
//
var grunt = require('grunt');

module.exports = {
  "test": {
    moduleGenTarget: 'NamedAsynchronous',
    moduleName: function(path) {
      return grunt.config.process('<%= package.namespace %>/tests/') + path;
    },
    files: [{
      expand: true,
      cwd: 'tests/',
      src: "**/*.ts",
      dest: "tmp/transpiled/tests/",
      ext: '.js'
    }]
  },
  "app": {
    moduleGenTarget: 'NamedAsynchronous',
    moduleName: function(path) {
      return grunt.config.process('<%= package.namespace %>/') + path.substring(4,path.length);
    },
    files: [{
      expand: true,
      cwd: 'app/',
      src: "**/*.ts",
      dest: "tmp/transpiled/app/",
      ext: '.js'
    }]
  }
};
