var express = require('express')
var router = express.Router()

var db = require('./../src/db.js')
var userCheck = require('./../src/userCheck.js')

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

module.exports = router
