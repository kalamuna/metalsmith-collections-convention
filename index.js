'use strict'

var metalsmithCollections = require('metalsmith-collections')
var extend = require('extend')
var match = require('multimatch')
var path = require('path')

module.exports = function (opts) {
  return function (files, metalsmith, done) {
    // Collect all .collection files.
    var collections = {}
    for (var file in files) {
      // Check if it matches the convention.
      if (match(file, '**.collection')[0]) {
        // Add it to the Collections array.
        collections[path.basename(file, '.collection')] = files[file]
        // Remove the file since we've processed the collection.
        delete files[file]
      }
    }

    // Construct the options for Metalsmith Collections.
    var options = extend({}, opts, collections)

    // Let Metalsmith Collections do its thing.
    metalsmithCollections(options)(files, metalsmith, done)
  }
}
