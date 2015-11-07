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
        var msgText = '"' + msg.ruleId + '" ' + msg.message

        if (msg.severity === 1) {
          file.warn(msgText, {line: msg.line, column: msg.column})
        } else if (msg.severity === 2) {
          file.fail(msgText, {line: msg.line, column: msg.column})
        }
      }
    }

    next()
  }
}

/*
 * Expose.
 */
module.exports = attacher
