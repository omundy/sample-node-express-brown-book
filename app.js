'use strict';

// import packages
const express = require('express');
const expressHandlebars = require('express-handlebars');
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


// test fortunes
const fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];


// add routes (before error middleware)
// - GET -> the HTTP verb
// - '/' => the path
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => {
	const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {
		fortune: randomFortune
	});
});



// add middleware - custom 404
app.use((req, res) => {
	res.status(404);
	res.render('404');
});
// add middleware - custom 500
app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(500);
	res.render('500');
});

// start server and listen on <port>
app.listen(port, () => console.log(
	`Express started on http://localhost:${port}; ` +
	`press Ctrl-C to terminate.`
));
