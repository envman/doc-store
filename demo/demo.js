var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  response.render('demo')
})

router.get('/new', function(request, response) {
  response.render('new')
})

router.get('/edit/:id', function(request, response) {

  // read data from api

  response.render('document', document)
})

module.exports = router;
