var assert = require('assert')
var path = require('path')
var fs = require('fs')

var createHTML = require('create-html')
var html = require('bel')

module.exports = function createIndexHTML (options) {
  assert.equal(typeof options, 'object', 'options object is required')
  assert.equal(typeof options.html, 'string', 'options.html is required')

  var content = html`<div>
    ${createHeader(options)}
    ${createSidebar(options.toc.json)}
    ${createContent(options.html)}
  </div>`

  return createHTML({
    title: options.title,
    body: content,
    head: `
      <meta name="description" content="${options.data.description}">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
      ${fs.readFileSync(path.join(__dirname, 'bundle.css'))}
      ${fs.readFileSync(path.join(__dirname, 'style.css'))}
      </style>
    `
  })
}

function createHeader (options) {
  return html`<header class="site-header">
    <h1 class="site-title">${options.title}</h1>
    <p class="site-description">${options.data.description}</p>
  </header>`
}

function createContent (el) {
  var content = html`<div class="content"></div>`
  content.innerHTML = el
  return content
}

function createSidebar (toc) {
  var items = toc.map(function (item) {
    return html`<div class="level-${item.lvl} sidebar-menu-item">
      <a href="#${item.slug}">${item.content}</a>
    </div>`
  })

  var sidebar = html`<div class="sidebar"></div>`

  sidebar.innerHTML = html`<div class="sidebar-menu">
    ${items}
  </div>`

  return sidebar
}
