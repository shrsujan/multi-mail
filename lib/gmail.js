'use strict';

const config = require('../config/config');

module.exports = {

	config: function (data) {
		let response = this.validate(data);
		if (response) {
			return response;
		} else{
			let gmailConfig = {};
			
			gmailConfig.set = config.gmail;
			gmailConfig.set.auth = {
				user: data.email,
				pass: data.password
			};

			gmailConfig.mailOptions = {
				from: data.from,
				to: data.to,
				subject: data.subject
			};

			// TODO attachment part
			if(data.attachments){
				gmailConfig.mailOptions.attachments = data.attachments;
			}
			
			return gmailConfig;

		}
	},

	validate: function (data) {
		let check = ["email", "password", "from", "to", "subject"];
		let result = false;

		check.forEach(function (obj) {
			if(!data.hasOwnProperty(obj)){
				result = {
					success: 0,
					error: 1,
					error_msg: obj + ' property missing'
				};
			}
		});

		return result;
	}
};
