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
app.use(express.static(process.cwd() + "/public"));
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

var count = 0;

var $ipsConnected = [];

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    /* Connected socket */
    var $ipAddress = socket.handshake.address;

    if (!$ipsConnected.hasOwnProperty($ipAddress)) {
  
        $ipsConnected[$ipAddress] = 1;
  
        count++;
  
        io.emit('counter',{count:count});
  
    }
    
    console.log('/////// - CLIENTS - ///////')
    console.log("* A new client is connected");
    console.log('client IP : ', $ipAddress);
    console.log('client SOCKET : ', socket.id);
    console.log('///////////////////////////');  
    /* Disconnect socket */
  
    socket.on('disconnect', function() {
  
        if ($ipsConnected.hasOwnProperty($ipAddress)) {
  
            delete $ipsConnected[$ipAddress];
  
          count--;
  
          io.emit('counter',{count:count});
  
        }
        console.log('Disconnected',count);
  
    });

}

//My Server

console.log('--Mypelis-- Peliculas para todos');
console.log(`Listening on port ${port}`);
