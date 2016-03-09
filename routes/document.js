var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var fs = require('fs');
var diff = require('deep-diff').diff;

var repoFactory = require('./../src/repository.js');

var db = new Datastore({ filename: __dirname + './../repos/meta.db', autoload: true });

var settingsData = fs.readFileSync('./settings.json', 'utf-8')
var settings = JSON.parse(settingsData)

router.get('/list', function(request, response) {

  db.find({}, function(error, docs) {
    response.json(docs)
  })
})

.post('/add', function(request, response) {
  var meta = {
    title: request.body.title
  }

  var document = request.body.document

  db.insert(meta, function(error, result) {
    var id = result._id;

    var path = settings.directory + id
    var repo = new repoFactory(path)

    repo.init(function() {
      fs.writeFile(path + '\\document.json', document, function(err) {
        repo.addAll(function() {
          repo.commit('Initial Commit', function() {

            response.end()
          })
        })
      })
    })
  })
})

.get('/:id', function(request, response) {

  var path = settings.directory + request.params.id

  db.findOne({_id: request.params.id}, function(error, result) {

    fs.readFile(path + '\\document.json', 'utf-8', function(err, data) {
      if (err) {
        console.log(err)
        response.end()
        return
      }

      result.document = data
      response.json(result)
    })
  })
})

.post('/update', function(request, response) {
  var path = settings.directory + request.body._id

  fs.writeFile(path + '\\document.json', request.body.document, function(error) {
    if (error) {
      console.log(error)
      return;
    }

    var repo = new repoFactory(path)
    repo.addAll(function() {
      var message = 'Updated'
      if (request.body.message) {
        message = request.body.message
      }

      repo.commit(message, function(commitResult) {

        response.json(commitResult)
      })
    })
  })
})

.get('/history/:id', function(request, response) {
  var path = settings.directory + request.params.id
  var repo = new repoFactory(path)

  repo.jsonLog(function(json) {
    response.json(json)
  })
})

.get('/diff/:id/:commit', function(request, response) {
  var path = settings.directory + request.params.id
  var repo = new repoFactory(path)

  var currentFile = settings.directory + 'current.json'
  var oldFile = settings.directory + 'old.json'

  repo.show(request.params.commit, currentFile, function() {
    repo.show(request.params.commit + '~1', oldFile, function() {
      fs.readFile(currentFile, 'utf-8', function(currentError, currentData) {
        fs.readFile(oldFile, 'utf-8', function(oldError, oldData) {
          var current = JSON.parse(currentData)
          var old = JSON.parse(oldData)

          var differences = diff(old, current)

          response.json(differences)
        })
      })
    })
  })
})

module.exports = router
