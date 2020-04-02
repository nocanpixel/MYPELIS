const express = require('express');
const router = express.Router();

const orm = require('../config/orm');

router.get('/', function(req, res,next) {
    orm.selectAll(function(error, pelicula) {
        if (error) {
            return res.status(501).json({
                message: 'Not able to query the database'
            });
        }
        //console.log(pelicula[1]);
        res.render('index', { 
            row1:pelicula[0],
            row2:pelicula[1],
            row3:pelicula[2],
             style: 'main'});
    });
});

router.get('/pelicula', (req, res) => {
    var id_pelicula = req.query.id;
    console.log('id_pelicula:',id_pelicula);
    orm.selectAllBy(id_pelicula,function(err, pelicula) {
        if (err) {
            return res.status(501).json({
                message: 'Not able to query the database'
            });
        }
        res.render('pelicula', {pelicula:pelicula, style: 'main'});
    });
});

router.put("/:id_pelicula/:condition", function (req, res) {
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

module.exports = router;