var assert = require('assert')
var fs = require('fs')

var hl = require('highlight.js')
var marked = require('marked')
var matter = require('gray-matter')
var toc = require('markdown-toc')
var xtend = require('xtend')

module.exports = function parseMarkdown (filepath, options, callback) {
  assert.equal(typeof filepath, 'string', 'filepath of markdown file is required')

  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  marked.setOptions({
    highlight: function (code, lang) {
      try {
        return highlight(code, lang)
      } catch (e) {
        console.error(e)
      }
    }
  })

  function highlight (code, lang) {
    return (lang ? hl.highlight(lang, code) : hl.highlightAuto(code)).value
  }

  fs.readFile(filepath, 'utf8', function (err, file) {
    if (err) return callback(err)
    var doc = matter(file)
    doc.html = marked(doc.content)
    doc.toc = toc(doc.content, {slugify: function (id) { return id.toLowerCase().replace(/[^\w]+/g, '-') }})
    doc.title = options.title || doc.toc.json[0].content
    doc = xtend(doc, doc.data)
    console.log('doc.description', doc.description)
    fs.stat(filepath, function (err, stat) {
      if (err) return callback(err)
      doc.updated = stat.mtime
      doc.created = stat.birthtime
      callback(null, doc)
    })
  })
}
