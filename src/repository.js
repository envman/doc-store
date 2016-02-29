var exec = require('child_process').exec
var mkdirp = require('mkdirp');

module.exports = function(path) {
  var path = path
  console.log('repo at: ' + path)

  this.init = function(callback) {
    console.log('init')

    mkdirp(path, function(err) {
      gitExecute('init', callback)
    });
  }

  this.pull = function(callback) {
    console.log('pull')

    gitExecute('pull', callback)
  }

  this.push = function(callback) {
    console.log('push')

    gitExecute('push', callback)
  }

  this.addAll = function(callback) {
    console.log('addAll')

    gitExecute('add -A', callback)
  }

  this.commit = function(message, callback) {
    console.log('commit')

    gitExecute('commit -m "' + message + '"', callback)
  }

  var gitExecute = function(command, callback) {
    exec('git ' + command, {cwd: path}, function(error, result) {
      if (error != null) {
        console.log(error)
      }

      if (result != null) {
        console.log(result)
      }

      callback()
    })
  }
}
