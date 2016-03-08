var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var fs = require('fs');

var repoFactory = require('./../src/repository.js');

var db = new Datastore({ filename: __dirname + './../repos/meta.db', autoload: true });

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

    var path = 'c:\\doc-store\\' + id
    var repo = new repoFactory(path)

    repo.init(function() {
      fs.writeFile(path + '\\document.json', document, function(err) {
        repo.addAll(function() {
          repo.commit('Initial Commit', function() {

            response.end()
          })
        })
      });
    })
  })
})

.get('/:id', function(request, response) {

  var path = 'c:\\doc-store\\' + request.params.id

  db.findOne({_id: request.params.id}, function(error, result) {

    fs.readFile(path + '\\document.json', 'utf-8', function(err, data) {
      if (err) {
        console.log(err)
        response.end()
        return;
      }

      result.document = data
      response.json(result)
    })
  })
})

.post('/update', function(request, response) {
  var path = 'c:\\doc-store\\' + request.body._id

  console.log(path + '\\document.json')
  console.log(request.body.document)

  fs.writeFile(path + '\\document.json', request.body.document, function(error) {
    if (error) {
      console.log(error)
      return;
    }

    var repo = new repoFactory(path)
    repo.addAll(function() {
      repo.commit('Updated', function() {

        response.json(request.body)
      })
    })
  })
})

module.exports = router
