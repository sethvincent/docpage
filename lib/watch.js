var watch = require('chokidar').watch
var Emitter = require('events').EventEmitter

module.exports = function createWatcher (filepath) {
  var watcher = watch(filepath)
  var emitter = new Emitter()

  watcher.on('add', function (filepath) {
    emitter.emit('change', filepath)
  })

  watcher.on('change', function (filepath) {
    emitter.emit('change', filepath)
  })

  return emitter
}
