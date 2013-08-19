module.exports = {
  compile: {
    options: {
      templateBasePath: /app\/templates\//,
      templateFileExtensions: /\.(hbs|hjs|handlebars)/
    },
    files: {
      "tmp/public/assets/templates.js": "app/templates/**/*.{hbs,hjs,handlebars}"
    }
  }
};
