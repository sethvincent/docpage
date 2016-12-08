# docpage

Quickly publish documentation sites from a single markdown file.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/docpage.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/docpage
[travis-image]: https://img.shields.io/travis/sethvincent/docpage.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/docpage
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

With `docpage` a single markdown file becomes:

- a single html file with:
  - simple, readable styles
  - a sidebar with table of contents
- an instant documentation site on [docpage.org](https://docpage.org) *(optional)*

## Install

```sh
npm install -g docpage
```

`docpage` requires Node.js and npm. [Install Node.js if you haven't already](https://nodejs.org).

## Command-line usage

### Build the index.html file from a markdown file:

```sh
docpage build example.md -o site/index.html
```

### Publish a markdown file to docpage.org

```sh
docpage register
docpage publish example.md example-docpage-site
```

### Watch a markdown file for changes and serve through a development server

```sh
docpage start example.md -w
```

### Full command-line help text

```
USAGE:
  docpage {command} [options]

COMMANDS:
  publish     publish a page
  build       build page,
  start       serve a page locally
  register    create an account on docpage.org
  login       log in to docpage.org
  help        show this help message

BUILD
  docpage build file.md

  Options:
  -o, --output   the filepath of the html file you want to create
  -w, --watch    watch the markdown file for changes and rebuild

START
  docpage start file.md

  Options:
  -o, --output   the filepath of the html file you want to create
  -w, --watch    watch the markdown file for changes and rebuild

PUBLISH
  docpage publish file.md name-of-project

LOGIN
  docpage login

REGISTER
  docpage register

HELP
  docpage help
```


## JavaScript module usage

```js
var fs = require('fs')
var path = require('path')
var docpage = require('docpage')

var input = path.join(__dirname, 'example.md')
var output = path.join(__dirname, 'index.html')

var options = {
  output: output,
  title: 'docpage'
}

docpage.build(input, options, function (err, file) {
  if (err) console.log(err)
})
```

## Open source

docpage is open source and based on Node.js and these projects:

- [township](https://github.com/township) – open source tools for auth
- [appa](https://github.com/sethvincent/appa) – a small framework for quickly creating JSON API servers
- [bel](https://github.com/shama/bel) – a simple library for composable DOM elements using tagged template strings

## See also

- [minidocs](https://github.com/freeman-lab/minidocs) – build a minimalist site for your documentation (more features than docpage)
- [static.land](https://static.land) – static site hosting with SSL via Let's Encrypt

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/docpage/issues)
- **twitter** – [@sethdvincent](https://twitter.com/sethdvincent)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[ISC](LICENSE.md)
