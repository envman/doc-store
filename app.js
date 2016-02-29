var express = require('express');
var bodyParser = require('body-parser');

var repository = require('./src/repository.js')

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For Demo
app.set('views', __dirname + '/demo/views')
app.set('view engine', 'jade');

app.use('/document', require('./routes/document.js'))
app.use('/demo', require('./demo/demo.js'));

// For Demo
app.use(express.static('public'));

app.listen(8080); // TODO: set port
