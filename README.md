# Metalsmith Collections Convention Plugin [![NPM version](https://img.shields.io/npm/v/metalsmith-collections-convention.svg)](https://www.npmjs.org/package/metalsmith-collections-convention)

[![Build Status](https://img.shields.io/travis/RobLoach/metalsmith-collections-convention/master.svg)](https://travis-ci.org/RobLoach/metalsmith-collections-convention)
[![Dependency Status](https://david-dm.org/RobLoach/metalsmith-collections-convention.png)](https://david-dm.org/RobLoach/metalsmith-collections-convention)

[Metalsmith](http://metalsmith.io) plugin to allow defining [Collections](https://github.com/segmentio/metalsmith-collections) by using file conventions.

## Installation

    npm install --save metalsmith-collections-convention

## Usage

Each collection metadata is constucted through files named `<name>.collection`.

### Example
#### src/articles.collection
``` yaml
---
pattern: 'articles/*.md'
sortBy: 'date'
reverse: true
---
This is the collection of articles.
```

### CLI

If you are using the command-line version of Metalsmith, you can install via npm, and then add the `metalsmith-jstransformer` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-collection-convention": {}
  }
}
```

### JavaScript

If you are using the JS Api for Metalsmith, then you can require the module and add it to your `.use()` directives:

```js
var collections = require('metalsmith-collection-convention');

metalsmith.use(collections());
```

## License

MIT
