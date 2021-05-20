const Joi = require("joi");

// User validation rules
module.exports = {
	login: {
		body: {
			email: Joi.string().email().required(),
			password: Joi.string().min(3).max(15).required(),
		},
	},
	create: {
		body: {
			email: Joi.string().email().required(),
			password: Joi.string().min(6).max(128).required(),
			password_confirmation: Joi.any()
				.valid(Joi.ref("password"))
				.required()
				.options({ language: { any: { allowOnly: "must match password" } } }),
			name: Joi.string().max(128).required(),
			phone: joi
				.string()
				.length(10)
				.pattern(/^[0-9]+$/)
				.required(),
		},
	},
};
