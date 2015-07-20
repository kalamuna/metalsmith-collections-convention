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
    var filename
    for (var i in list) {
      filename = list[i]
      // Retrieve the collection name.
      var name = path.basename(filename, '.collection')

      // Add it to the collection.
      collections[name] = files[filename]

      // Remove the file since we've processed the collection.
      delete files[filename]
    }

    // Construct additional collections from file metadata.
    list = Object.keys(files)
    for (i in list) {
      filename = list[i]
      var collection = files[filename].collection
      if (collection) {
        var collectionName = collection
        // Check if it's an object that defines its own collection.
        if (collection !== null && typeof collection === 'object') {
          // Name is a required property.
          if (collection.name) {
            collectionName = collection.name
            delete collection.name
          } else {
            return done('Collection is defined with an object, but does not provide the name.')
          }

          // Queue the collection object and redefine it in the file.
          collections[collectionName] = extend({}, collections[collectionName], collection)
          files[filename].collection = collectionName
        }
      }
    }

    // Construct the options for Metalsmith Collections.
    var options = extend({}, opts, collections)

    // Let Metalsmith Collections do its thing.
    metalsmithCollections(options)(files, metalsmith, done)
  }
}
