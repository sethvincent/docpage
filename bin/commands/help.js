var usage = `
  USAGE:
    docpage {command} [options]

  COMMANDS:
    publish,   publish a page
    build,     build page,
    start,     serve a page locally
    register,  create an account on docpage.org
    login,     log in to docpage.org
    help,      show this help message

  BUILD
    docpage build file.md

  START
    docpage start file.md

  PUBLISH
    docpage publish file.md name-of-project

  LOGIN
    docpage login

  REGISTER
    docpage register

  HELP
    docpage help

`

module.exports = {
  name: 'help',
  command: function help (args, a, b, c) {
    console.log(usage)
    process.exit()
  }
}
