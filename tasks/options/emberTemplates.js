var grunt = require('grunt');

module.exports = {
  options: {
    templateBasePath: /app\//,
    templateFileExtensions: /\.(hbs|hjs|handlebars)/,
    templateRegistration: function(name, template) {
      return grunt.config.process("define('<%= package.namespace %>/") + name + "', [], function(){ return " + template + "; });";
    }
  },
  debug: {
    options: {
      precompile: false
    },
    src: "app/templates/**/*.{hbs,hjs,handlebars}",
    dest: "tmp/public/assets/templates.js"
  },
  dist: {
    src: "<%= emberTemplates.debug.src %>",
    dest: "<%= emberTemplates.debug.dest %>"
  }
};
