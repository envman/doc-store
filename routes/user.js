var express = require('express')
var router = express.Router()

var db = require('./../src/db.js')
var userCheck = require('./../src/userCheck.js')
var documentFactory = require('./../src/document.js')

router.post('/', function(request, response) {
  var user = request.body

  db.users.insert(user, function(error, inserted) {
    response.end(inserted._id)
  })
})

.get('/', function(request, response) {
  db.users.find({}, function(error, users) {
    response.json(users)
  })
})

.get('/:id', function(request, response) {
  db.users.findOne({_id: request.params.id}, function(error, user) {
    response.json(user)
  })
})

.post('/createdocument', function(request, response) {
  var documentId = request.body.documentId
  var userId = request.body.userId

  db.users.update({name: userId}, {$push: {documents: documentId}}, function(error, num) {
    if (error) {
      console.log(error)
      return
    }

    console.log(num + ' changed')
    console.log(userId)

    db.users.findOne({name: userId}, function(error, user) {
      var options = {
        user: userId,
        id: documentId,
        email: user.email
      }

      var rootDocument = new documentFactory({id: documentId, user: 'central'})

      var gdocument = new documentFactory(options)
      gdocument.clone(rootDocument.path, function() {
        response.end()
      })
    })
  })
})

module.exports = router
