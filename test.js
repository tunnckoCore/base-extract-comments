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

test('base-extract-comments:', function (done) {
  var app = new Base({ isApp: true })
  app.use(plugin())
  app.use(function (app) {
    return function (comment) {
      comment = comment.current // workaround
      console.log('actual', comment)
    }
  })
  app.extractComments(fs.readFileSync('./fixture.js', 'utf8'))

  done()
})
