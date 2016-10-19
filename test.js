'use strict';

var mailer = require('./index');

var mailConfig = {
	service: 'gmail',
	email: 'youremail@gmail.com',
    password: 'yourpassword',
    from: 'YourName <youremail@gmail.com>',
	to: ['receiver1@gmail.com', 'receiver2@gmail.com'],
    subject: 'test test'
};

var html = "<h1>hello all</h1><br/><p>TESTING MAIL</p>";

var cb = function (report) {
	console.log("FINAL REPORT\n", report);
};

mailer.send(mailConfig, html, cb);
