/*!
 * base-extract-comments <https://github.com/tunnckoCore/base-extract-comments>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var test = require('mukla')
var Base = require('base')
var plugin = require('./index')

var input = fs.readFileSync('./fixture.js', 'utf8')

test('app.extractComments can be synchronous', function (done) {
  var app = new Base({ isApp: true })
  app.use(plugin())
  app.use(function (app) {
    return function (comment) {
      test.ok(comment, 'expect an object')
      test.strictEqual(typeof comment, 'object')
      test.strictEqual(typeof comment.index, 'number')
      test.strictEqual(typeof comment.current, 'string')
    }
  })
  var comments = app.extractComments(input)
  test.ok(comments, 'expect an array of comment objects')
  test.ok(comments.length > 1)
  done()
})

test('app.extractComments can be asynchronous (done as last argument)', function (done) {
  var app = new Base({ isApp: true })
  app.use(plugin()).extractComments(input, { foo: 'bar' }, function (err, comments) {
    test.ifError(err)
    test.ok(comments)
    test.ok(comments.length)
    test.ok(comments.length > 1)
    done()
  })
})

test('should be able to pass `input` to Ctor `cache.input` (async ok)', function (done) {
  var app = new Base({ isApp: true, cache: { input: input } })
  app.use(plugin()).extractComments({}, function (err, comments) {
    test.ifError(err)
    done()
  })
})

test('should throw in sync mode if `input` not a string', function (done) {
  var app = new Base({ isApp: true })
  function fixture () {
    app.use(plugin()).extractComments()
  }
  test.throws(fixture, /expect a string/)
  done()
})

test('should pass error to callback in async mode', function (done) {
  var app = new Base({ isApp: true })
  app.use(plugin()).extractComments(function cb (err) {
    test.ifError(!err)
    test.strictEqual(err instanceof Error, true)
    test.strictEqual(/expect a string/.test(err.message), true)
    done()
  })
})
