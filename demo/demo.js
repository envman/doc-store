var express = require('express')
var router = express.Router()
var httpRequest = require('request')

router.get('/', function(request, response) {
  response.render('demo')
})

router.get('/new', function(request, response) {
  response.render('new')
})

router.get('/edit/:id', function(request, response) {

  httpRequest('http://localhost:8080/document/' + request.params.id, function (error, httpResponse, body) {
    if (!error && httpResponse.statusCode == 200) {

      var document = {document: JSON.parse(body)}
      
      response.render('document', document)

    } else {
      console.log(error)

      response.end();
      return;
    }
  })
})

module.exports = router;
