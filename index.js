const express = require('express');
const expbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const routes = require('./routes/handlers');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
var server = app.listen(process.env.PORT || 8080);

const port = process.env.PORT || 8080;


//Middlewares
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//Express session
app.use(session({
	secret: 'super secret session',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Flash middleware
app.use(flash());

//Express handleBars
app.engine('handlebars', expbs({
    defaultLayout: 'main',
    layoutsDir: 'views/mainLayout'
}));
app.set('view engine', 'handlebars');

//Routing
app.use('/', routes);



//My Server

console.log('--Mypelis-- Peliculas para todos');
console.log(`Listening on port ${port}`);
