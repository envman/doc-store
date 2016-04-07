var Datastore = require('nedb')

var db = {
  meta: new Datastore({ filename: __dirname + './../repos/meta.db', autoload: true }),
  users: new Datastore({ filename: __dirname + './../repos/users.db', autoload: true })
}

module.exports = db
