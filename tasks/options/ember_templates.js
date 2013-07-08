module.exports = {
  compile: {
    options: {
      templateName: function(filename) {
        return filename.replace(/app\/templates\//,'').replace(/\.hbs/,'');
      }
    },
    files: {
      "tmp/public/assets/templates.js": "app/templates/**/*.hbs"
    }
  }
};
