var express = require('express');
var bodyParser = require('body-parser');

var repository = require('./src/repository.js')

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/document', require('./routes/document.js'))

app.listen(8080);
