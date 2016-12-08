var prompt = require('prompt')

module.exports = {
  name: 'register',
  command: function register (args) {
    var ship = require('../township')

    var opts = [
      {
        name: 'email',
        required: true
      },
      {
        name: 'password',
        required: true,
        hidden: true,
        replace: '*'
      }
    ]

    prompt.message = ''
    prompt.colors = false
    prompt.start()

    prompt.get(opts, function (err, results) {
      if (err) return console.log(err.message)
      ship.register(results, function (err) {
        if (err) console.log(err)
        process.exit()
      })
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
