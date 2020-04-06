const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
 connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'loquendo_1',
    database: 'mypelis_db',
    multipleStatements: true
});

/*
b91c9568152bce:b0f3c3ae
need
@us-cdbr-iron-east-01.cleardb.net/heroku_17070a22fd3a03e
*/

}
connection.connect();
module.exports = connection;