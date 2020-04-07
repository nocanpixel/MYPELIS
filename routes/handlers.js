const express = require('express');
const router = express.Router();
const url = require('url');
const sendMail = require('../public/js/mail');
const { log } = console;

const orm = require('../config/orm');
const connection = require('../config/connection');

router.get('/', function(req, res,next) {
    connection.query('SELECT * FROM libreria ORDER BY id_pelicula DESC LIMIT 20;SELECT * FROM libreria ORDER BY numero_vistas DESC', function (error, results, fields) {
        if (error) throw error;
        //console.log(results[0][0]);
        res.render('index', {
            row1:results[1][0],
            row2:results[1][1],
            row3:results[1][2],
            row4:results[1][3],
            row5:results[1][4],
            row6:results[1][5],
            row7:results[1][6],
            row8:results[1][7],
            row9:results[1][8],
            row10:results[1][9],
            all:results[0],
            style:'main'});
    });
});

router.get('/search', (req, res) => {
    var nombre_pelicula = req.query.nombre_pelicula;
    console.log('nombre : ', nombre_pelicula);
    connection.query(`SELECT * FROM libreria WHERE nombre_pelicula LIKE '%${nombre_pelicula}%'`, function(error, result, fields) {
        if (error) throw error;
        if(!result.length) {
            var empty = !result.length;
            res.render('404', {style: 'search'});
        } else {
            res.render('search', {
                res:result,
            style: 'search'});
        }
    });
});

router.get('/pelicula', (req, res) => {
    var nombre_pelicula = req.query.nombre_pelicula;
    console.log('NOMBRE_PELICULA :',nombre_pelicula);
    orm.selectAllBy(nombre_pelicula,function(err, pelicula) {
        if (err) {
            return res.status(501).json({
                message: 'Not able to query the database'
            });
        }
        res.render('pelicula', {pelicula:pelicula, style: 'pelicula'});
    });
});

router.put("/pelicula/:id_pelicula/:condition", function (req, res) {
    const id_pelicula = req.params.id_pelicula;
    const condition = req.params.condition;
    console.log('id:',id_pelicula,'value:',condition);
    orm.updateOne(condition, id_pelicula, function(err, pelicula) {
        if (err) {
            return res.status(501).json({
                message: 'Not able to add burger to your favorite'
            });
        }
        return res.json({
            id_pelicula: id_pelicula
        });
    });
});


// email, subject, text mailer mailer
router.post('/email', (req, res) => {
    const { email,text } = req.body;
    console.log('Data: ', req.body);

    sendMail(email,text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});

module.exports = router;