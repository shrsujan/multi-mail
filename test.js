'use strict';

var mailer = require('./index');

var mailConfig = {
	service: 'gmail',
	email: 'youremail@gmail.com',
	password: 'yourpassword',
	from: 'YourName <youremail@gmail.com>',
	to: ['receiver1@gmail.com', 'receiver2@gmail.com'],
	subject: 'email subject',
	attachments: [{
		filename: 'bird.jpg',
		path: 'bird.jpg',
		cid: 'unique@kreata.ee'
	},{
		filename: 'scene.jpg',
		path: 'scene.jpg',
	}]
};

var html = '<h1>hello all</h1><br/><p>TESTING MAIL</p><br/><img src="cid:unique@kreata.ee"/>';

var cb = function (report) {
	console.log("FINAL REPORT\n", report);
};

mailer.send(mailConfig, html, cb);
