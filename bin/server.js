/**
* Server definition.
*/

'use strict';

var 
	http = require('http'),
	debug = require('debug')('server');

var app = require('../app');

var 
	port = process.env.PORT,
	server = http.createServer(app);

debug('>>> server says: bootstraping server.');
server.listen(port);
debug('>>> server says: port: '+ port + '.');
server.on('error', onError);

function onError(err) {
	switch (err.code) {
		case 'EACCES':
			debug('>>> server says: it is required elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			debug('>>> server says: it is already in use');
			process.exit(1);
			break;
		default:
			throw err;
	}
}

