var path = require('path')

module.exports = {
  name: 'start',
  command: function start (args) {
    var docpage = require('../docpage')
    var input = path.join(process.cwd(), args._[0])
    args.output = args.output || (args._[1] ? path.join(process.cwd(), args._[1]) : null)

    docpage.start(input, args, function (err, file) {
      if (err) return console.log(err)
    })
  },
  options: [
    {
      name: 'output',
      abbr: 'o',
      boolean: false,
      default: '',
      help: 'path to index.html file you want to create'
    },
    {
      name: 'watch',
      abbr: 'w',
      boolean: false,
      default: '',
      help: 'watch the markdown file for changes and rebuild'
    },
    {
      name: 'description',
      abbr: 'd',
      boolean: false,
      default: '',
      help: 'description of the site'
    },
    {
      name: 'code',
      abbr: 'c',
      boolean: false,
      default: '',
      help: 'Link to code repository'
    },
    {
      name: 'main-website',
      abbr: 'm',
      boolean: false,
      default: '',
      help: 'Link to website'
    }
  ]
}
