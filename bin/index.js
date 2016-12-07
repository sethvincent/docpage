#! /usr/bin/env node

var subcommand = require('subcommand')

var match = subcommand({
  // root: require('./commands/root'),
  // none: require('./commands/deploy-shorthand'),
  commands: [
    require('./commands/help'),
    require('./commands/build'),
    require('./commands/publish'),
    require('./commands/start'),
    require('./commands/login'),
    require('./commands/register')
  ]
})

match(process.argv.slice(2))
