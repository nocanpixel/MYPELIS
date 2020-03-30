const express = require('express');
const expbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const routes = require('./routes/handlers');

const app = express();
const port = process.env.PORT || 8080;

//Middlewares
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

app.listen(port, function() {
    console.log('--MyPelis-- Peliculas para todos')
    console.log(`Listening on port ${port} !`)
})