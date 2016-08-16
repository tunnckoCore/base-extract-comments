'use strict'

var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign

/**
 * Lazily required module dependencies
 */
require('acorn-extract-comments', 'extract')
require('base-plugins', 'plugins')
require('base-plugins-enhanced', 'pluginsEnhanced')
require('is-valid-app', 'isValid')
require('lazy-utils', 'utils')
require = fn // eslint-disable-line no-undef, no-native-reassign

/**
 * Expose `utils` modules
 */

module.exports = utils.utils.extend(utils, utils.utils)
