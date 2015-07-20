# Metalsmith Collections Convention Plugin [![NPM version](https://img.shields.io/npm/v/metalsmith-collections-convention.svg)](https://www.npmjs.org/package/metalsmith-collections-convention)

[![Build Status](https://img.shields.io/travis/RobLoach/metalsmith-collections-convention/master.svg)](https://travis-ci.org/RobLoach/metalsmith-collections-convention)
[![Dependency Status](https://david-dm.org/RobLoach/metalsmith-collections-convention.png)](https://david-dm.org/RobLoach/metalsmith-collections-convention)

[Metalsmith](http://metalsmith.io) plugin to allow defining [Collections](https://github.com/segmentio/metalsmith-collections) by using file conventions.

## Installation

    npm install --save metalsmith-collections-convention

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

## Usage

There are two different methods of define collections. First, by using `<name>.collection` file convention, or by defining the collection in source file meta-data.

### Convention

Each collection is constucted through defining files named `<name>.collection`.

#### `src/articles.collection`
``` yaml
---
pattern: 'articles/*.md'
sortBy: 'date'
reverse: true
---
This is the collection of articles. It is available at:
  metalsmith.metadata().articles
```

### Metadata

You can define which collection source files are placed by placing them in the meta-data.

#### `src/articles/foo.md`
``` yaml
---
collection: articles
---
This article will appear in the articles collection. It is available at:
  metalsmith.metadata().articles
```

#### `src/documents/bar.md`
``` yaml
---
collection:
  name: documents
  sortBy: title
---
This article will appear in the documents collection, sorted by title. It is
available at:
  metalsmith.metadata().documents
```

## License

MIT
