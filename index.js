var assert = require('assert')
var http = require('http')
var path = require('path')
var fs = require('fs')

var request = require('nets')
var tmpdir = require('os-tmpdir')
var xtend = require('xtend')

var parseMarkdown = require('./lib/parse-markdown')
var createHTML = require('./lib/create-html')
var createWatcher = require('./lib/watch')

module.exports = function docpage (opts) {
  opts = opts || {}
  var host = opts.host || 'https://api.docpage.org'

  return {
    build: build,
    publish: publish,
    start: start
  }

  function build (filepath, options, callback) {
    assert.equal(typeof filepath, 'string', 'filepath string is required')
    assert.equal(typeof options, 'object', 'options object is required')
    assert.equal(typeof callback, 'function', 'callback function is required')

    parse(filepath, options, callback)
    if (options.watch) {
      var watch = createWatcher(filepath)

      watch.on('change', function (path) {
        parse(path, options, callback)
      })
    }

    function parse (filepath, options, callback) {
      parseMarkdown(filepath, options, function (err, md) {
        if (err) return callback(err)

        md = xtend(md, options)
        var file = createHTML(md)

        if (!options.output) return callback(null, file)

        fs.writeFile(options.output, file, function (err) {
          if (err) return callback(err)
          callback(null, file)
        })
      })
    }
  }

  function publish (filepath, options, callback) {
    assert.equal(typeof options.token, 'string', 'options.token is required')
    assert.equal(typeof options.slug, 'string', 'options.slug string is required')

    options.output = options.output || path.join(tmpdir(), 'index.html')

    build(filepath, options, function (err, file) {
      if (err) return callback(err)

      var formData = {
        index: fs.createReadStream(options.output)
      }

      var opts = {
        url: host + '/sites',
        method: 'POST',
        formData: formData,
        json: true,
        headers: {
          slug: options.slug,
          authorization: 'Bearer ' + options.token
        }
      }

      request(opts, callback)
    })
  }

  function start (filepath, options, callback) {
    options.output = options.output || path.join(tmpdir(), 'index.html')

    var server = http.createServer(function (req, res) {
      res.setHeader('Content-Type', 'text/html')
      fs.createReadStream(options.output).pipe(res)
    })

    server.listen(options.port || 5588, function () {
      process.on('SIGINT', function () {
        server.close()
        process.exit()
      })
    })

    build(filepath, options, function (err, file) {
      if (err) return callback(err)
    })
  }
}
