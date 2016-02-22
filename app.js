var express = require('express');
var bodyParser = require('body-parser');

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: Add Routes
app.get('/', function(request, response) {
  response.end('Up');
});

app.listen(1234); // TODO: set port
