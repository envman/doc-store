var express = require('express')
var router = express.Router()
var Datastore = require('nedb')

var documentFactory = require('./../src/document.js')

var db = new Datastore({ filename: __dirname + './../repos/meta.db', autoload: true })

router.get('/list', function(request, response) {

  db.find({}, function(error, docs) {
    response.json(docs)
  })
})

.post('/add', function(request, response) {
  var meta = {
    title: request.body.title
  }

  db.insert(meta, function(error, result) {
    var gdocument = new documentFactory(result._id)

    gdocument.create(request.body.document, function() {
      response.end()
    })
  })
})

.get('/:id', function(request, response) {

  db.findOne({_id: request.params.id}, function(error, result) {

    var gdocument = new documentFactory(result._id)

    gdocument.read(function(data) {
      result.document = data
      response.json(result)
    })
  })
})

.post('/update', function(request, response) {
  var gdocument = new documentFactory(request.body._id)
  gdocument.update(request.body.document, request.body.message, function() {
    response.end('OK')
  })
})

.get('/history/:id', function(request, response) {
  var gdocument = new documentFactory(request.params.id)
  gdocument.history(function(history) {
    response.json(history)
  })
})

module.exports = router
