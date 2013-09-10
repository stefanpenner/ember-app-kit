module.exports = {
  all: {
    src: ['app/styles/**/*.css'],
    dest: 'tmp/public/assets/custom.css'
  },
  prod: {
    src: ['tmp/public/assets/custom.css', 'tmp/public/assets/app.css'],
    dest: 'tmp/public/assets/app.css'
  }
}
