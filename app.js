/**
* Bootstrap app
*/

'use strict';

var
	express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	debug = require('debug')('app');

var routes = require('./routes');

require('dotenv').config({path: path.join(__dirname, '.env')});

var app = express();

debug('>>> app says: starting app.');
debug('>>> app says: environment: '+ process.env.NODE_ENV);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/*', routes);

// Management of errors.

app.use(function(req, res, next) {
	var err = new Error();
	err.code = 'ENOENT';
	next(err);
});

app.use(function(err, req, res, next){
	switch (err.code) {
		case 'ENOENT':
			res
				.status(404)
				.render('error', {title: 'Not Found', body: '404 Not Found.'});
			break;
		default:
			(process.env.NODE_ENV === 'development')
				? ( 
						debug('>>> app says, error: ' + err),
						res
							.status(500)
							.render('error', {title: 'Internal Server Error', body: '500 Internal Server Error.'})
					)
				: res
						.status(500)
						.render('error', {title: 'Internal Server Error', body: '500 Internal Server Error.'})
	}
});

module.exports = app;