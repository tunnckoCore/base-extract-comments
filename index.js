/*!
 * base-extract-comments <https://github.com/tunnckoCore/base-extract-comments>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

module.exports = function baseExtractComments (opts) {
  return function extractComments (app) {
    if (!utils.isValid(app, 'base-extract-comments')) return

    this.use(utils.plugins())
    this.use(utils.pluginsEnhanced())
    this.define('extractComments', function parse (input, options) {
      if (utils.isObject(input)) {
        this.options = utils.extend({}, this.options, input)
        input = null
      }

      this.cache = utils.extend({}, this.cache)
      this.cache.input = input || this.cache.input
      this.options = utils.extend({
        preserve: false,
        block: true,
        line: false
      }, opts, this.options, options, {
        locations: true,
        unwrap: true
      })

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

      return this.cache.comments
    })
  }
}
