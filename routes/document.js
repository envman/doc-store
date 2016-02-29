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

    fs.readFile(path + '\\document.json', function(err, data) {

      var stuff = data;

      console.log(err)
      console.log(stuff)

      result.document = stuff
      response.render('document', result)
    })
  })
})

.post('/update', function(request, response) {
  
})

module.exports = router;
