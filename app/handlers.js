

// custom modules
const fortune = require('./app/fortune');

exports.home = (req,res) => res.render('home');
exports.about = (req,res) =>
	res.render('about', {
		fortune: fortune.getFortune()
	});

exports.notFound = (req,res) => res.render('404');

exports.serverError = (err, req, res, next) => res.render('500');
