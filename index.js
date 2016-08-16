/*!
 * base-extract-comments <https://github.com/tunnckoCore/base-extract-comments>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * > Plugin that adds `.extractComments` method to
 * your [base][] application, that extracts JSDoc-style
 * code comments using [acorn-extract-comments][] lib.
 *
 * **Example**
 *
 * ```js
 * var extract = require('base-extract-comments')
 * var Base = require('base')
 * var app = new Base({ isApp: true })
 *
 * app.use(extract({ foo: 'option' }))
 * console.log(app.extractComments) // => [Function: extractComments]
 * ```
 *
 * @name   baseExtractComments
 * @param  {Object} `opts` options object merged with `app.options`
 * @return {Function} the actual plugin
 * @api public
 */

module.exports = function baseExtractComments (opts) {
  return function extractComments (app) {
    if (!utils.isValid(app, 'base-extract-comments')) return

    this.use(utils.plugins())
    this.use(utils.pluginsEnhanced())

    /**
     * > Extract code comments from `input` string and returns
     * an array of comment objects or pass it to `done` callback.
     * Notice that `.extractComments` have sync and async mode, so
     * if you do not pass `done` callback it will throw or return an Array.
     * You also can pass `input` to the constructor of your app to
     * the `this.cache` object such as `{ cache: { input: 'some str' } }`
     *
     * **Example**
     *
     * ```js
     * // sync mode
     *
     * app.use(extract())
     * var comments = app.extractComments('some string')
     * // => array of comment objects
     * ```
     *
     * **Example**
     *
     * ```js
     * // sync mode
     *
     * var app = new Base({ cache: { input: 'foo bar baz' } })
     * app.use(extract())
     * var comments = app.extractComments()
     * // => array of comment objects
     * ```
     *
     * **Example**
     *
     * ```js
     * // async mode
     *
     * app.use(extract())
     * app.extractComments('foo bar', function done (err, comments) {
     *   // => `comments` is array of comment objects
     * })
     * ```
     *
     * @name   .extractComments
     * @param  {String|Object|Function} `input` input string, `options` or `done` callback
     * @param  {Object|Function} `options` optional `options` or `done` callback
     * @param  {Function} `done` callback function (optional)
     * @return {Array} an Array of comment objects or `done(null, comments)`
     * @api public
     */

    this.define('extractComments', function parse (input, options, done) {
      done = typeof input === 'function' ? input : done
      done = typeof options === 'function' ? options : done
      done = typeof done === 'function' ? done : null

      if (utils.isObject(input)) {
        this.options = utils.extend({}, this.options, input)
        input = null
      }

      this.cache = utils.extend({}, this.cache)
      this.cache.input = typeof input === 'string' ? input : this.cache.input
      this.options = utils.extend({
        preserve: false,
        block: true,
        line: false
      }, opts, this.options, options, {
        locations: true,
        unwrap: true
      })

      try {
        this.cache.comments = utils.extract(this.cache.input, this.options).comments
        var len = this.cache.comments.length
        var idx = -1

        while (++idx < len) {
          // not so cool workaround,
          // but we can't pass different than object currently
          // waiting `use` PR
          this.run({
            current: this.cache.comments[idx],
            index: idx,
            next: this.cache.comments[idx + 1]
          })
        }
      } catch (err) {
        if (done) return done(err)
        throw err
      }

      return done
        ? done(null, this.cache.comments)
        : this.cache.comments
    })
  }
}
