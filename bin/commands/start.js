var path = require('path')

module.exports = {
  name: 'start',
  command: function start (args) {
    var docpage = require('../docpage')
    var input = path.join(process.cwd(), args._[0])
    args.output = args._[1] ? path.join(process.cwd(), args._[1]) : null

    docpage.start(input, args, function (err, file) {
      if (err) return console.log(err)
      console.log('server listening on http://127.0.0.1:5588')
    })
  },
  options: [
    // {
    //   name: '',
    //   abbr: '',
    //   boolean: false,
    //   default: '',
    //   help: ''
    // }
  ]
}
