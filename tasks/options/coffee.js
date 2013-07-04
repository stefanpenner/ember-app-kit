// CoffeeScript compilation. This must be enabled by modification
// of Gruntfile.js.
//
// The `bare` option is used since this file will be transpiled
// anyway. In CoffeeScript files, you need to escape out for
// some ES6 features like import and export. For example:
//
// `import 'appkit/models/user' as User`
//
// Posts = Em.Object.extend
//   init: (userId) ->
//     @set 'user', User.findById(userId)
//
// `export = Posts`
//

module.exports = {
  "test": {
    options: {
      bare: true
    },
    files: [{
      expand: true,
      cwd: 'tests/',
      src: ['**/*.coffee', '!vendor/**/*.coffee'],
      dest: 'tmp/javascript/tests',
      ext: '.js'
    }]
  },
  "app": {
    options: {
      bare: true
    },
    files: [{
      expand: true,
      cwd: 'app/',
      src: '**/*.coffee',
      dest: 'tmp/javascript/app',
      ext: '.js'
    }]
  }
};
