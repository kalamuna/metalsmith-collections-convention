var assertDir = require('assert-dir-equal')
var collections = require('../')
var Metalsmith = require('metalsmith')
var assert = require('assert')

var titles = [
  'Other Article!',
  'Something',
  'Zoo Article'
]

/* global it */
function test (name) {
  it('should match collections in ' + name, function (done) {
    var path = 'test/fixtures/' + name
    var metalsmith = Metalsmith(path)
    metalsmith
      .use(collections())
      .build(function (err) {
        if (err) {
          return done(err)
        }

        // Ensure the collection was loaded correctly.
        assert.equal(3, metalsmith.metadata().articlelist.length)

        // Ensure the titles match.
        for (var i in metalsmith.metadata().articlelist) {
          var file = metalsmith.metadata().articlelist[i]
          if (file) {
            assert.equal(file.title, titles[i])
          }
        }

        // Check whether the files were build just file.
        assertDir(path + '/build', path + '/expected')

        done()
      })
  })
}

test('basic')
test('metadata')
