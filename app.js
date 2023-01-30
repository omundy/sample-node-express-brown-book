// import packages
const express = require('express');
const expressHandlebars = require('express-handlebars');
// custom modules
const handlers = require('./app/handlers');
// create express app
const app = express();
// set port either from env file or default
const port = process.env.PORT || 3000;


// configure handlebars as the view engine
app.engine('handlebars', expressHandlebars({
	defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// declare static middleware
app.use(express.static(__dirname + '/public'));


// add routes (before error middleware)
// - GET (HTTP verb) and  '/' (path)
app.get('/', handlers.home);
app.get('/about', handlers.about);


// add middleware - custom 404, 500
app.use(handlers.notFound);
app.use(handlers.serverError);

// start server and listen on <port>
app.listen(port, () => console.log(
	`Express started on http://localhost:${port}; ` +
	`press Ctrl-C to terminate.`
));
