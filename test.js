'use strict';

var mailer = require('./index');

var mailConfig = {
	service: 'gmail',
	email: '',
    password: '',
    from: 'me <sender@gmail.com>',
	to: ['test@gmail.com'],
    subject: 'test test'
};

var html = "<h1>hello all</h1>";

var cb = function (report) {
	console.log("FINAL REPORT\n", report);
};

mailer.send(mailConfig, html, cb);