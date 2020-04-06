const connection = require('./connection');

const orm = {

    selectAllBy: function(nombre_pelicula,cb) {
        const sqlQuery = `SELECT * FROM libreria WHERE nombre_pelicula = '${nombre_pelicula}'`;
        connection.query(sqlQuery, function (err, data) {
            if (err) cb(err, null);
            cb(null, data);
        });
    },

    updateOne: function(condition, id_pelicula, cb) {
        const sqlUpdate = `UPDATE libreria SET numero_vistas = '${condition}'+1  WHERE id_pelicula = ${id_pelicula}`;
        connection.query(sqlUpdate, function (err, data) {
            if (err) cb(err, null);
                cb(null, data);
        });
    }
};

module.exports = orm;