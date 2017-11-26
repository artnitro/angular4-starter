/**
* Index controller.
*/

'use strict';

var 
	path = require('path'),
	debug = require('debug')('indexController');

debug('>>> indexController says: loaded indexController');

var indexController = function(req, res, next) {
	res
		.status(200)
		.sendFile('index.html', {root: path.join(__dirname, 'public')}, function(err) {
			if (err) next(err);
		});
};

module.exports = indexController;