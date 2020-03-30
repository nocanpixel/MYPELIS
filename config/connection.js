const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'loquendo_1',
    database: 'mypelis_db'
});

connection.connect();
module.exports = connection;