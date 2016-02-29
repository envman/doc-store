var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  response.render('demo')
})

router.get('/new', function(request, response) {
  response.render('new')
})

module.exports = router;
