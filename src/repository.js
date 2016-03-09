var exec = require('child_process').exec
var mkdirp = require('mkdirp');

module.exports = function(path) {
  var path = path

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

  this.show = function(commit, destination, callback) {
    gitExecute('show ' + commit + ':document.json > ' + destination, callback)
  }

  this.jsonLog = function(callback) {

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

      callback(result)
    })
  }
}

module.exportsa = function(path) {
  var path = path

  var gitExecute = function(command, callback) {

  }

  return {
    commit: function(message, callback) {
      gitExecute('commit -m "' + message + '"', callback)
    }
  }
}
