var grunt = require('grunt');

module.exports = {
    debug: {
        name: '<%= package.name %>',
        description: '<%= package.description %>',
        version: '<%= package.version %>',
        url: '<%= package.docURL %>/',
        logo: 'http://emberjs.com/images/ember_logo.png',
        options: {
            paths: ['app/'],
            outdir: './docs',
            themedir: './node_modules/yuidoc-theme-blue'
        }
    }
};
