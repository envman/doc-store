var Datastore = require('nedb')

var settings = require('./settings.js')

var db = {
  meta: new Datastore({ filename: settings.directory + 'meta.db', autoload: true }),
  users: new Datastore({ filename: settings.directory + 'users.db', autoload: true })
}

module.exports = db
