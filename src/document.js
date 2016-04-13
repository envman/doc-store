var fs = require('fs')
var repoFactory = require('./repository.js')
var settings = require('./settings.js')

module.exports = function(options) {
  var id = options.id
  var user = options.user || 'root'
  var path = settings.directory + user + '/' + id
  var email = options.email || 'root@' + id

  var documentPath = path + '/document.json'

  var repository = new repoFactory(path)

  var createRoot = function(callback) {
    repository.initBare(function() {
      callback()
    })
  }

  var create = function(document, callback) {

    repository.init(function() {

      fs.writeFile(documentPath, document, function(err) {
        save('Initial Commit', callback)
      })
    })
  }

  var save = function(message, callback) {

    repository.addAll(function() {
      repository.commit(message, function() {
        if (user != 'central') {
          repository.push(function() {
            callback()
          })
        } else {
          callback()
        }
      })
    })
  }

  var read = function(callback) {

    var readData = function() {
      fs.readFile(documentPath, 'utf-8', function(err, data) {
        if (err) {
          console.log(err)
          return
        }

        callback(data)
      })
    }

    if (user != 'central') {
      repository.pull(function() {
        readData()
      })
    } else {
      readData()
    }
  }

  var update = function(data, message, callback) {
    fs.writeFile(documentPath, data, function(error) {
      if (error) {
        console.log(error)
        return
      }

      save(message || 'Updated', callback)
    })
  }

  var history = function(callback) {
    repository.jsonLog(callback)
  }

  var clone = function(location ,callback) {
    repository.clone(location, function() {
      repository.config('user.name "' + user + '"', function() {
        repository.config('user.email ' + email, callback)
      })
    })
  }

  return {
    create: create,
    save: save,
    read: read,
    update: update,
    history: history,
    clone: clone,
    path: path,
    createRoot: createRoot
  }
}
