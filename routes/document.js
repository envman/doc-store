var express = require('express')
var router = express.Router()
var Datastore = require('nedb')

var documentFactory = require('./../src/document.js')
var db = require('./../src/db.js')
var userCheck = require('./../src/userCheck.js')

router.use(userCheck)

router.get('/list', function(request, response) {

  db.meta.find({}, function(error, docs) {
    response.json(docs)
  })
})

.post('/add', function(request, response) {

  var meta = {
    title: request.body.title
  }

  db.meta.insert(meta, function(error, result) {
    var options = {
      id: result._id
    }

    var rootDocument = new documentFactory({id: result._id, user: 'central', email: 'central@' + result._id})
    rootDocument.createRoot(function() {

      var gdocument = new documentFactory({id: result._id})
      gdocument.clone(rootDocument.path, function() {

        gdocument.update(request.body.document, 'Initial Commit', function() {
          response.end()
        })
      })
    })
  })
})

.get('/:id/:user?', function(request, response) {

  db.meta.findOne({_id: request.params.id}, function(error, result) {

    var options = {
      id: result._id
    }

    if (request.params.user) {
      options.user = request.params.user
    }

    var gdocument = new documentFactory(options)

    gdocument.read(function(data) {
      result.document = data
      response.json(result)
    })
  })
})

.post('/update/:user?', function(request, response) {
  var options = {
    id: request.body._id
  }

  if (request.params.user) {
    options.user = request.params.user
  }

  var gdocument = new documentFactory(options)
  gdocument.update(request.body.document, request.body.message, function() {
    response.end('OK')
  })
})

module.exports = router
