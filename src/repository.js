var exec = require('child_process').exec

module.exports = function(path) {
  this.path = path

  this.pull = function(callback) {
    this.gitExecute('pull', callback)
  }

  this.push = function(callback) {
    this.gitExecute('push', callback)
  }

  this.addAll = function(callback) {
    this.gitExecute('add -A', callback)
  }

  this.commit = function(message, callback) {
    this.gitExecute('commit -m "' + message + '"')
  }

  this.gitExecute = function(command, callback) {
    exec('git ' + command, {cwd: this.path}, function(error, result) {
      callback()
    })
  }

  this.logPath = function() {
    console.log(this.path)
  }
}
