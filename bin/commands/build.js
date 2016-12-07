var path = require('path')

module.exports = {
  name: 'build',
  command: function deploy (args) {
    var docpage = require('../docpage')
    var input = path.join(process.cwd(), args._[0])
    var output = args._[1] ? path.join(process.cwd(), args._[1]) : null

    docpage.build(input, { output: output }, function (err, file) {
      if (err) return console.log(err)
      if (!output) console.log(file)
      process.exit()
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
