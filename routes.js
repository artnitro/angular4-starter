/**
* Routes.
*/

'use strict';

var 
	express = require('express'),
	path = require('path'),
	debug = require('debug')('routes');

var indexController = require('./controller/indexController');

var routes = express.Router();

debug('>>> routes says: Creating routes');

routes.get('/', indexController);

module.exports = routes;