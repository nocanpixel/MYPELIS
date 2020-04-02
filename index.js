const express = require('express');
const expbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const routes = require('./routes/handlers');

const app = express();
var server = app.listen(process.env.PORT || 8080);
var socket = require('socket.io');
var io = socket(server);

const port = process.env.PORT || 8080;


//Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//Express handleBars
app.engine('handlebars', expbs({
    defaultLayout: 'main',
    layoutsDir: 'views/mainLayout'
}));
app.set('view engine', 'handlebars');

//Routing
app.use('/', routes);


//My Server

io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    
});

console.log('--Mypelis-- Peliculas para todos');
console.log(`Listening on port ${port}`);
