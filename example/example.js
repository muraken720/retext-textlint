'use strict'

var retext = require('retext')
var japanese = require('retext-japanese')
var textlint = require('retext-textlint')
var compact = require('eslint/lib/formatters/compact')

var text = 'タイトル「文章の推敲に必要なこと」\n' +
    '\n' +
    '1 これは前段です。これは中段（２文の場合は後段という。）です。これは後段です。聡は常用漢字表外の漢字です。'

var options = {
  plugins: [
    'textlint-plugin-jtf-style'
  ]
}

retext().use(japanese).use(textlint, options).process(text, (err, file, doc) => {
  console.log('\n=== file ===')
  console.log(compact([file]))
})
