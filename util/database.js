const mysql = require( 'mysql2' )

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-express',
  password: 'Ron9elrey!'
})

module.exports = {
  db: db.promise()
}
