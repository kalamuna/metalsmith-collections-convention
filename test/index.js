const assert = require('assert')
const assertDir = require('assert-dir-equal')
const Metalsmith = require('metalsmith')
const collections = require('..')

const titles = [
	'Other Article!',
	'Something',
	'Zoo Article'
]

/* global it */
function test(name, numberOfItems) {
	if (!numberOfItems) {
		numberOfItems = 3
	}
	it('should match collections in ' + name, done => {
		const path = 'test/fixtures/' + name
		const metalsmith = new Metalsmith(path)
		metalsmith
			.use(collections())
			.build(function (error) {
				if (error) {
					return done(error)
				}

				// Ensure the collection was loaded correctly.
				const articles = this.metadata().articlelist
				assert.strictEqual(numberOfItems, articles.length)

				if (name === 'multiple') {
					const bikes = this.metadata().bikes // eslint-disable-line prefer-destructuring
					assert.strictEqual(bikes.length, 2)
				} else {
					// Ensure the titles match.
					articles.forEach((file, i) => {
						if (file) {
							assert.strictEqual(file.title, titles[i])
						}
					})
				}

				// Check whether the files were build just file.
				assertDir(path + '/build', path + '/expected')

				done()
			})
	})
}

test('basic')
test('metadata')
test('multiple', 4)
