var exec = require('child_process').exec
var mkdirp = require('mkdirp');

module.exports = function(path) {
  var path = path
  console.log('repo at: ' + path)

  this.init = function(callback) {
    mkdirp(path, function(err) {
      gitExecute('init', callback)
    });
  }

  this.pull = function(callback) {
    gitExecute('pull', callback)
  }

  this.push = function(callback) {
    gitExecute('push', callback)
  }

  this.addAll = function(callback) {
    gitExecute('add -A', callback)
  }

  this.commit = function(message, callback) {
    gitExecute('commit -m "' + message + '"', callback)
  }

  var gitExecute = function(command, callback) {
    var command = 'git ' + command;

    exec(command, {cwd: path}, function(error, result) {
      console.log(command)

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
