var fs = require('fs')
var repoFactory = require('./repository.js')
var settings = require('./settings.js')

module.exports = function(id) {
  var id = id
  var path = settings.directory + id
  var documentPath = path + '\\document.json'

  var repository = new repoFactory(path)

  var create = function(document ,callback) {
    repository.init(function() {
      fs.writeFile(documentPath, document, function(err) {
        save('Initial Commit', callback)
      })
    })
  }

  var save = function(message, callback) {
    repository.addAll(function() {
      repository.commit(message, function() {
        callback()
      })
    })
  }

  var read = function(callback) {
    fs.readFile(documentPath, 'utf-8', function(err, data) {
      if (err) {
        console.log(err)
        return
      }

      callback(data)
    })
  }

  var update = function(data, message, callback) {
    fs.writeFile(documentPath, data, function(error) {
      if (error) {
        console.log(error)
        return;
      }

      save(message || 'Updated', callback)
    })
  }

  var history = function(callback) {
    repository.jsonLog(callback)
  }

  return {
    create: create,
    save: save,
    read: read,
    update: update,
    history: history
  }
}
