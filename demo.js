var express = require('express');
var bodyParser = require('body-parser');

var repository = require('./src/repository.js')

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/demo/views')
app.set('view engine', 'jade');

app.use('/document', require('./routes/document.js'))
app.use('/demo', require('./demo/demo.js'));

app.use(express.static('public'));

app.listen(8080);
