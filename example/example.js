'use strict'

var retext = require('retext')
var japanese = require('retext-japanese')
var textlint = require('retext-textlint')
var compact = require('eslint/lib/formatters/compact')

var text = 'タイトル「ＡＢＣ」\n' +
    '\n' +
    '1 これは前段です。これは中段（２文の場合は後段という。）です。これは後段です。'

var options = {
  plugins: [
    'textlint-plugin-jtf-style'
  ]
}

retext().use(japanese).use(textlint, options).process(text, (err, file, doc) => {
  if (err) {
    console.log(err)
  }
  console.log('\n=== doc ===')
  console.log(doc)

  console.log('\n=== file ===')
  console.log(compact([file]))
})
