'use strict';

var mailer = require('./index');

var mailConfig = {
	service: 'gmail',
	email: 'script@zyoba.com',
    password: 'Nepal@+977',
    from: 'me <sender@gmail.com>',
	to: ['shrsujan2007@gmail.com', 'reney.roze987@gmail.com'],
    subject: 'test test'
};

var html = "<h1>hello all</h1><br/><p>TESTING MAIL</p>";

var cb = function (report) {
	console.log("FINAL REPORT\n", report);
};

mailer.send(mailConfig, html, cb);