var path = require('path')

module.exports = {
  name: 'publish',
  command: function (args) {
    var input = path.join(process.cwd(), args._[0])
    var slug = args._[1]

    var ship = require('../township')
    var docpage = require('../docpage')

    var login = ship.getLogin()
    login.slug = slug

    docpage.publish(input, login, function (err, res, body) {
      if (err) console.log(err)
      if (res.statusCode >= 400) console.log(body)
      console.log('site published at http://docpage.org/' + slug)
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
