var assert = require('assert')
var path = require('path')
var fs = require('fs')

var createHTML = require('create-html')
var html = require('bel')

module.exports = function createIndexHTML (options) {
  assert.equal(typeof options, 'object', 'options object is required')
  assert.equal(typeof options.html, 'string', 'options.html is required')

  var content = html`<div style="height:100%;">
    ${createHeader(options)}
    ${createSidebar(options.toc.json)}
    ${createContent(options.html)}
  </div>`

  return createHTML({
    title: options.title,
    body: content,
    head: `
      <meta name="description" content="${options.description}">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
      ${fs.readFileSync(path.join(__dirname, 'bundle.css'))}
      ${fs.readFileSync(path.join(__dirname, 'style.css'))}
      </style>
    `
  })
}

function createHeader (options) {
  var links = []
  var title

  if (options.code) {
    if (options.code.indexOf('github') > -1) {
      title = 'github'
    } else if (options.code.indexOf('gitlab') > -1) {
      title = 'gitlab'
    }

    links.push(html`<a href="${options.code}" class="site-header-link">
      ${title}
    </a>`)
  }

  if (options['main-website']) {
    links.push(html`<a href="${options.code}" class="site-header-link">
      website
    </a>`)
  }

  return html`<header class="site-header">
    <h1 class="site-title">${options.title}</h1>
    <p class="site-description">${options.description}</p>
    ${links.length ? links : ''}
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
