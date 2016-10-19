'use strict';

const config = require('./config/config');
const async = require('async');
const nodemailer = require('nodemailer');

module.exports = {

	config: function (data) {
		if (!data.service || !config.hasOwnProperty(data.service)) {
			let errorResponse = {
				success: 0,
				error: 1,
				error_msg: "Service not provided"
			};
			return errorResponse;
		} else if (data.service && !config.hasOwnProperty(data.service)) {
			let errorResponse = {
				success: 0,
				error: 1,
				error_msg: "Incorrect service name"
			};
			return errorResponse;
		} else {
			const mailService = require('./lib/' + data.service);
			return mailService.config(data);
		}
	},

	send: function (mailConfig, template, cb) {
		let that = this;
		let data = this.config(mailConfig);
		let receivers = [];
		if (data.error) {
			cb(data);
		} else {
			if (typeof(data.mailOptions.to) == "string") {
				receivers.push(data.mailOptions.to);
			} else {
				receivers = data.mailOptions.to;
			}
			data.mailOptions.html = template;

			let report = {};
			let client = nodemailer.createTransport(data.set);
			async.eachSeries(receivers, function(receiver, callback){
				data.mailOptions.to = receiver;
				that.sender(client, data, report, function(err){
					if (err == null) {
						callback();
					} else {
						callback(err);
					}
				});
			}, function(){
				cb(report);
			});
		}
	},

	sender: function (client, mailData, report, cb) {
		console.log(mailData);
		client.sendMail(mailData.mailOptions, function(err, result){
		    if(err){
		        console.log(err);
		        cb(err);
		    }
		    if(result) {
				if(result.accepted.length){
					console.log(result.accepted[0] + ": Sent");
					report[result.accepted[0]] = 'Sent';
				}
				if(result.rejected.length){
					console.log(result.rejected[0] + ": Not sent");
					report[result.rejected[0]] = 'Not sent';
				}
				if(typeof(result.pending) != 'undefined'){
					if(result.pending.length){
						console.log(result.pending[0] + ": Pending");
						report[result.pending[0]] = 'Pending';
					}
				}
		        cb(null);
		    }
		});
	}

};