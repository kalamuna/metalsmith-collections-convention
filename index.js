'use strict'

const path = require('path')
const metalsmithCollections = require('metalsmith-collections')
const extend = require('extend')
const minimatch = require('minimatch')

module.exports = function (opts) {
	return function (files, metalsmith, done) {
		// Collect all .collection files.
		const collections = {}
		let i = 0
		const list = minimatch.match(Object.keys(files), '*.collection', {
			matchBase: true
		})

		// Loop through each one and add it to the collection.
		let filename
		for (i in list) {
			if ({}.hasOwnProperty.call(list, i)) {
				filename = list[i]
				// Retrieve the collection name.
				const name = path.basename(filename, '.collection')

				// Add it to the collection.
				collections[name] = files[filename]

				// Remove the file since we've processed the collection.
				delete files[filename]
			}
		}

		// Construct additional collections from file metadata.
		Object.keys(files).forEach(filename => {
			const collection = files[filename].collection
			if (collection && !Array.isArray(collection)) {
				let collectionName = collection
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
		})

		// Construct the options for Metalsmith Collections.
		const options = extend({}, opts, collections)

		// Let Metalsmith Collections do its thing.
		metalsmithCollections(options)(files, metalsmith, done)
	}
}
