var express = require('express')
var router = express.Router()
var Datastore = require('nedb')

var documentFactory = require('./../src/document.js')
var userCheck = require('./../src/userCheck.js')

router.use(userCheck)

router.get('/:id/:user?', function(request, response) {

  var options = {
    id:request.params.id
  }

  if (request.params.user) {
    options.user = request.params.user
  }

  var gdocument = new documentFactory(options)
  gdocument.history(function(history) {
    response.json(history)
  })
})

module.exports = router
