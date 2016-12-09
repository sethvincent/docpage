var usage = `
USAGE:
  docpage {command} [options]

COMMANDS:
  publish     publish a page
  build       build page,
  start       serve a page locally
  register    create an account on docpage.org
  login       log in to docpage.org
  help        show this help message

BUILD
  docpage build file.md

  Options:
  -o, --output          the filepath of the html file you want to create
  -w, --watch           watch the markdown file for changes and rebuild
  -c, --code            link to code repository
  -m, --main-website    link to main website for project

START
  docpage start file.md

  Options:
  -o, --output          the filepath of the html file you want to create
  -w, --watch           watch the markdown file for changes and rebuild
  -c, --code            link to code repository
  -m, --main-website    link to main website for project

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
