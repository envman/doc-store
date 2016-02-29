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
      fs.writeFile(path + '/document.json', document, function(err) {
        repo.addAll(function() {
          repo.commit('Initial Commit', function() {

            response.end()
          })
        })
      });
    })
  })
})

module.exports = router;
