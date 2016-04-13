var express = require('express')
var router = express.Router()
var httpRequest = require('request')

router.get('/:user/', function(request, response) {


  response.render('userdemo')
})

.get('/new', function(request, response) {
  response.render('new')
})

.get('/edit/:id', function(request, response) {

  httpRequest('http://localhost:8080/document/' + request.params.id, function (error, httpResponse, body) {
    if (!error && httpResponse.statusCode == 200) {

      var document = {document: JSON.parse(body)}

      response.render('document', document)

    } else {
      console.log(error)

      response.end()
    }
  })
})

.get('/history/:id', function(request, response) {

  httpRequest('http://localhost:8080/document/history/' + request.params.id, function (error, httpResponse, body) {
    if (!error && httpResponse.statusCode == 200) {

      var history = { history: JSON.parse(body) }

      response.render('history', history)
    } else {
      console.log(error)

      response.end()
    }
  })
})

.get('/users', function(request, response) {
  httpRequest('http://localhost:8080/user', function(error, httpResponse, body) {
    response.render('users', {users: JSON.parse(body)})
  })
})

module.exports = router
