'use strict'

var metalsmithCollections = require('metalsmith-collections')
var extend = require('extend')
var match = require('minimatch').match
var path = require('path')

module.exports = function (opts) {
  return function (files, metalsmith, done) {
    // Collect all .collection files.
    var collections = {}
    var list = match(Object.keys(files), '*.collection', {
      matchBase: true
    })

    // Loop through each one and add it to the collection.
    for (var i in list) {
      var filename = list[i]
      // Retrieve the collection name.
      var name = path.basename(filename, '.collection')

      // Add it to the collection.
      collections[name] = files[filename]

      // Remove the file since we've processed the collection.
      delete files[filename]
    }

    // Construct the options for Metalsmith Collections.
    var options = extend({}, opts, collections)

    // Let Metalsmith Collections do its thing.
    metalsmithCollections(options)(files, metalsmith, done)
  }
}
