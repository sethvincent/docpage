module.exports = require('township-client')({
  server: process.env.DOCPAGE_URL || 'https://api.docpage.org',
  config: { filename: '.docpagerc' }
})
