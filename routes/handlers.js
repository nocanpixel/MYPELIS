const express = require('express');
const router = express.Router();

const orm = require('../config/orm');

router.get('/', function(req, res,next) {
    orm.selectAll(function(error, popular) {
        if (error) {
            return res.status(501).json({
                message: 'Not able to query the database'
            });
        }
        //console.log(popular[0]);
        res.render('index', { 
            row1:popular[0],
            row2:popular[1],
            row3:popular[2],
            row4:popular[3],
            row5:popular[4],
            row6:popular[5],
             style: 'main'});
    });
});


module.exports = router;