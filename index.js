/**
 * @author Kenichiro Murata
 * @copyright 2015 Kenichiro Murata
 * @license MIT
 * @fileoverview retext plugin to use textlint.
 */

'use strict'

/**
 * Dependencies.
 */
var TextLintEngine = require('textlint').TextLintEngine
var toString = require('nlcst-to-string')

/**
 * Attacher.
 *
 * @param {Retext} retext
 * @param {Object} options
 * @returns {Function} - `transformer`.
 */
function attacher (retext, options) {
  return function transformer (cst, file, next) {
    var textlint = new TextLintEngine(options)
    var result = textlint.executeOnText(toString(cst))

    if (result) {
      var messages = result[0].messages

      for (var index = 0; index < messages.length; index++) {
        var msg = messages[index]
        file.warn('"' + msg.ruleId + '" ' + msg.message, {line: msg.line, column: msg.column})
      }
    }

    next()
  }
}

/*
 * Expose.
 */
module.exports = attacher
