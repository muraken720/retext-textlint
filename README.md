# retext-textlint [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

[retext](https://github.com/wooorm/retext) plugin to use [textlint](https://github.com/azu/textlint).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext-textlint
```

## Usage

Install textlint plugins.

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install textlint-plugin-jtf-style
```

*   example/example.js

```javascript
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

/**
* === file ===
* : line 1, col 10, Warning - "jtf-style/2.1.2.漢字" 「敲」は「常用漢字表」外の漢字です。
* : line 3, col 41, Warning - "jtf-style/2.1.2.漢字" 「聡」は「常用漢字表」外の漢字です。
* : line 3, col 17, Error - "jtf-style/2.1.8.算用数字" 算用数字は「半角」で表記します。
* 
* 3 problems
*/
```

*   example/.textlintrc

```javascript
{
  "plugins": [
    "jtf-style"
  ],
  "rules": {
    "jtf-style/2.1.2.漢字": {
      "severity" : "warning"
    },
    "jtf-style/4.1.1.句点(。)": false,
    "jtf-style/3.1.1.全角文字と半角文字の間": false
  }
}
```

## API

### [retext](https://github.com/wooorm/retext).[use](https://github.com/wooorm/retext#retextuseplugin-options)\(textlint, options\)

**Parameters**

*   `textlint` — This plugin.
*   `options` (`Object`, optional)

    *   `plugins` (`Array.<string>`) - textlint plugin name array.

## Related

*   [textlint](https://github.com/azu/textlint)
*   [retext](https://github.com/wooorm/retext)
*   [retext-japanese](https://github.com/muraken720/retext-japanese)
*   [vfile](https://github.com/wooorm/vfile)

## License

[MIT](LICENSE)
