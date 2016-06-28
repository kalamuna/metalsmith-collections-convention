var assert = require('assert')
var assertDir = require('assert-dir-equal')
var Metalsmith = require('metalsmith')
var collections = require('../')

var titles = [
  'Other Article!',
  'Something',
  'Zoo Article'
]

/* global it */
function test(name) {
  it('should match collections in ' + name, function (done) {
    var path = 'test/fixtures/' + name
    var metalsmith = new Metalsmith(path)
    metalsmith
      .use(collections())
      .build(function (err) {
        if (err) {
          return done(err)
        }

        // Ensure the collection was loaded correctly.
        var articles = this.metadata().articlelist
        assert.equal(3, articles.length)

        // Ensure the titles match.
        articles.forEach(function (file, i) {
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
