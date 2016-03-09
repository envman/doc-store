var fs = require('fs')

var settingsData = fs.readFileSync('./settings.json', 'utf-8')
var settings = JSON.parse(settingsData)

module.exports = settings
