const express = require('express');
const router = express.Router();
const url = require('url');
const sendMail = require('../public/js/mail');
const { log } = console;
const request = require('request');
const orm = require('../config/orm');
const connection = require('../config/connection');


router.get('/logout', function(req,res,next) {
    if(req.session) {
        //Delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.get('/sherlock', function(req,res) {
    if(req.session.loggedin) {
        res.redirect('/adminPanel');
    } else {
        res.render('sherlock', {style:'sherlock'});
    }
});

router.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    console.log(username);
    console.log(password);
    if(username && password) {
        connection.query('SELECT * FROM usuarios WHERE user = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/adminPanel');
			} else {
                request.flash('Error', 'Wrong password or username');
                response.redirect('/sherlock');
			}			
			response.end();
        });
    } else {
		response.send('Please enter Username and Password!');
		response.end();
    }
});

router.get('/adminPanel', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

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
            res.render('404', {style: 'search', main:'main'});
        } else {
            res.render('search', {
                res:result,
            style: 'search', main:'main'});
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
    const condition = parseInt(req.params.condition)+1;
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

    if(req.body.captcha === undefined || 
        req.body.captcha === '' ||
        req.body.captcha === null){
            return res.json({"Success": false, "msg":"please sleect captcha"});
        }

        //Secret key
        const secretKey = '6Le3hOcUAAAAAJPvXlMlIeK-Rb8qJkZWVuD-HbAJ';

        //Verify URL
        const VerifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;


        //Make request to verify 

        request(VerifyUrl,(err, response, body) => {
            body = JSON.parse(body);
            
            if(body.success !== undefined && !body.success) {
                return res.json({"Success": false, "msg":"Failed captcha"});
            }

            const { email,text } = req.body;
            console.log('Data: ', req.body.captcha);
        
            sendMail(email,text, function(err, data) {
                if (err) {
                    log('ERROR: ', err);
                    return res.status(500).json({ message: err.message || 'Internal Error' });
                }
                log('Email sent!!!');
                return res.json({ message: 'Email sent!!!!!' });
            });
        });

    /*
    const { email,text } = req.body;
    console.log('Data: ', req.body.captcha);

    sendMail(email,text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
    */
});

module.exports = router;