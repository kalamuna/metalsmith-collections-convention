const assert = require('assert')
const assertDir = require('assert-dir-equal')
const Metalsmith = require('metalsmith')
const collections = require('../')

const titles = [
  'Other Article!',
  'Something',
  'Zoo Article'
]

/* global it */
function test(name) {
  it('should match collections in ' + name, done => {
    const path = 'test/fixtures/' + name
    const metalsmith = new Metalsmith(path)
    metalsmith
      .use(collections())
      .build(function (err) {
        if (err) {
          return done(err)
        }

        // Ensure the collection was loaded correctly.
        const articles = this.metadata().articlelist
        assert.equal(3, articles.length)

        // Ensure the titles match.
        articles.forEach((file, i) => {
          if (file) {
            assert.equal(file.title, titles[i])
          }
        })

        // Check whether the files were build just file.
        assertDir(path + '/build', path + '/expected')

        done()
      })
  })
}

test('basic')
test('metadata')
