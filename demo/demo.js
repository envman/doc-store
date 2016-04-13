var express = require('express')
var router = express.Router()
var httpRequest = require('request')

router.get('/', function(request, response) {
  response.render('demo')
})

.get('/new', function(request, response) {
  response.render('new')
})

.get('/edit/:id/:user?', function(request, response) {

  var user = request.params.user || ''

  var url = 'http://localhost:8080/document/' + request.params.id + '/' + user

  httpRequest(url ,function (error, httpResponse, body) {
    if (!error && httpResponse.statusCode == 200) {

      var document = {document: JSON.parse(body), user: user}

      response.render('document', document)

    } else {
      console.log(error)

      response.end()
    }
  })
})

.get('/history/:id/:user?', function(request, response) {

  var user = request.params.user || ''
  var url = 'http://localhost:8080/history/' + request.params.id + '/' + user

  httpRequest(url, function (error, httpResponse, body) {
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

.get('/userdocuments/:user', function(request, response) {
  httpRequest('http://localhost:8080/user/' + request.params.user, function(error, httpResponse, body) {

    response.render('userdocuments', {user: JSON.parse(body)})
  })
})

module.exports = router
