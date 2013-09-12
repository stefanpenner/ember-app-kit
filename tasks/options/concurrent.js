module.exports = {
  dist: [
    "build:templates", 
    "build:scripts", 
    "build:styles", 
    "build:other"
  ],
  debug: [
    "build:templates:debug", 
    "build:scripts", 
    "build:styles", 
    "build:other"
  ]
}
