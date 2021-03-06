var exec = require('child_process').exec
var mkdirp = require('mkdirp');

module.exports = function(path) {
  var path = path

  var gitExecute = function(command, callback) {
    var command = 'git ' + command

    exec(command, {cwd: path}, function(error, result) {
      console.log(command)

      if (error != null) {
        console.log(error)
        return;
      }

      callback(result)
    })
  }

  var commit = function(message, callback) {
    gitExecute('commit -m "' + message + '"', callback)
  }

  var jsonLog = function(callback) {

    gitExecute('log --pretty=format:"{ *commit*: *%H*, *author*: *%an <%ae>*, *date*: *%ad*, *message*: *%f*},"', function(data) {

      // replace *'s with "'s
      var quoted = data.split('*').join('"')

      // remove trailing ,
      var commaRemoved = quoted.slice(0, -1)

      // add array [ & ]
      var jsonString = '[' + commaRemoved + ']'

      callback(JSON.parse(jsonString))
    })
  }

  var init = function(callback) {
    mkdirp(path, function(err) {
      gitExecute('init', callback)
    })
  }

  var pull = function(callback) {
    gitExecute('pull', callback)
  }

  var push = function(callback) {
    gitExecute('push', callback)
  }

  var addAll = function(callback) {
    gitExecute('add -A', callback)
  }

  return {
      commit: commit,
      jsonLog: jsonLog,
      init:init,
      pull: pull,
      push: push,
      addAll: addAll
    }
  }
