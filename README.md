# [base-extract-comments][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Base (github @node-base) application plugin for extracting code comments using `acorn-extract-comments`.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
```
npm i base-extract-comments --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const baseExtractComments = require('base-extract-comments')
```

### [baseExtractComments](index.js#L34)
> Plugin that adds `.extractComments` method to your [base][] application, that extracts JSDoc-style code comments using [acorn-extract-comments][] lib.

**Params**

* `opts` **{Object}**: merged with `app.options` and passed to [acorn-extract-comments][]    
* `returns` **{Function}**: the actual plugin  

**Example**

```js
var extract = require('base-extract-comments')
var Base = require('base')
var app = new Base({ isApp: true })

app.use(extract({ foo: 'option' }))
console.log(app.extractComments) // => [Function: extractComments]
```

### [.extractComments](index.js#L81)
> Extract code comments from `input` string and returns an array of comment objects or pass it to `done` callback. Notice that `.extractComments` have sync and async mode, so if you do not pass `done` callback it will throw or return an Array. You also can pass `input` to the constructor of your app to the `this.cache` object such as `{ cache: { input: 'some str' } }`

**Params**

* `input` **{String|Object|Function}**: input string, `options` or `done` callback    
* `options` **{Object|Function}**: merged with `app.options` and passed to [acorn-extract-comments][] or `done` callback    
* `done` **{Function}**: callback function (optional)    
* `returns` **{Array}**: an Array of comment objects or `done(null, comments)`  

**Example**

```js
// sync mode

app.use(extract())
var comments = app.extractComments('some string')
// => array of comment objects

// or

var app = new Base({ cache: { input: 'foo bar baz' } })
app.use(extract())
var comments = app.extractComments()
// => array of comment objects

// or in async mode

app.use(extract())
app.extractComments('foo bar', function done (err, comments) {
  // => `comments` is array of comment objects
})
```

## Related
- [acorn-extract-comments](https://www.npmjs.com/package/acorn-extract-comments): Extract JavaScript code comments from a string, using `acorn`. Optionally returns the… [more](https://github.com/tunnckocore/acorn-extract-comments#readme) | [homepage](https://github.com/tunnckocore/acorn-extract-comments#readme "Extract JavaScript code comments from a string, using `acorn`. Optionally returns the AST and first line of code after comment - useful for parsing code context and api docs.")
- [base-data](https://www.npmjs.com/package/base-data): adds a `data` method to base-methods. | [homepage](https://github.com/node-base/base-data "adds a `data` method to base-methods.")
- [base-plugins-enhanced](https://www.npmjs.com/package/base-plugins-enhanced): Error handling and extras for `.use` and `.run` methods of your Base… [more](https://github.com/tunnckocore/base-plugins-enhanced#readme) | [homepage](https://github.com/tunnckocore/base-plugins-enhanced#readme "Error handling and extras for `.use` and `.run` methods of your Base apps. Modifies `.use` method to be able to 1) accept array of functions, 2) options object as second argument. Emits `error` event if some plugin fails.")
- [base-plugins](https://www.npmjs.com/package/base-plugins): Upgrade's plugin support in base applications to allow plugins to be called… [more](https://github.com/node-base/base-plugins) | [homepage](https://github.com/node-base/base-plugins "Upgrade's plugin support in base applications to allow plugins to be called any time after init.")
- [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable… [more](https://github.com/node-base/base) | [homepage](https://github.com/node-base/base "base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")
- [extract-comments](https://www.npmjs.com/package/extract-comments): Uses esprima to extract line and block comments from a string of… [more](https://github.com/jonschlinkert/extract-comments) | [homepage](https://github.com/jonschlinkert/extract-comments "Uses esprima to extract line and block comments from a string of JavaScript. Also optionally parses code context (the next line of code after a comment).")
- [postcore](https://www.npmjs.com/package/postcore): Processor engine for Post* family like PostCSS, PostHTML and PostJSON. | [homepage](https://github.com/postcore/postcore#readme "Processor engine for Post* family like PostCSS, PostHTML and PostJSON.")
- [use-ware](https://www.npmjs.com/package/use-ware): Adds sync plugin support to your application. Kinda fork of [use… [more](https://github.com/tunnckocore/use-ware#readme) | [homepage](https://github.com/tunnckocore/use-ware#readme "Adds sync plugin support to your application. Kinda fork of [use][] - use it if you need to support nesting. Or use [ware][] if you need async middleware system.")
- [use](https://www.npmjs.com/package/use): Easily add plugin support to your node.js application. | [homepage](https://github.com/jonschlinkert/use "Easily add plugin support to your node.js application.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/base-extract-comments/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[acorn-extract-comments]: https://github.com/tunnckocore/acorn-extract-comments
[base]: https://github.com/node-base/base
[use]: https://github.com/jonschlinkert/use
[ware]: https://github.com/segmentio/ware

[npmjs-url]: https://www.npmjs.com/package/base-extract-comments
[npmjs-img]: https://img.shields.io/npm/v/base-extract-comments.svg?label=base-extract-comments

[license-url]: https://github.com/tunnckoCore/base-extract-comments/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/base-extract-comments.svg

[downloads-url]: https://www.npmjs.com/package/base-extract-comments
[downloads-img]: https://img.shields.io/npm/dm/base-extract-comments.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/base-extract-comments
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/base-extract-comments.svg

[travis-url]: https://travis-ci.org/tunnckoCore/base-extract-comments
[travis-img]: https://img.shields.io/travis/tunnckoCore/base-extract-comments/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/base-extract-comments
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/base-extract-comments.svg

[david-url]: https://david-dm.org/tunnckoCore/base-extract-comments
[david-img]: https://img.shields.io/david/tunnckoCore/base-extract-comments.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

