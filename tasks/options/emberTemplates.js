module.exports = {
  options: {
    templateBasePath: /app\/templates\//,
    templateFileExtensions: /\.(hbs|hjs|handlebars)/
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
