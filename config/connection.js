const mysql = require('mysql');


var connection = mysql.createPool({
  host     : 'us-cdbr-iron-east-01.cleardb.net',
  user     : 'b091c9ca29261a',
  password : '0a9310fa',
  database: 'heroku_4a2777817a2812a',
  multipleStatements: true

});


  connection.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  })



/*
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
 connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b091c9ca29261a',
    password: '0a9310fa',
    database: 'heroku_4a2777817a2812a',
    multipleStatements: true
});

b91c9568152bce:b0f3c3ae

@us-cdbr-iron-east-01.cleardb.net/heroku_17070a22fd3a03e


}
*/


module.exports = connection;