module.exports = {
  compile: {
    options: {
      processName: function(filename) {
        return filename.replace(/app\/templates\//,'').replace(/\.hbs/,'');
      }
    },
    files: {
      "tmp/templates/templates.js": "app/templates/*.hbs"
    }
  }
};
