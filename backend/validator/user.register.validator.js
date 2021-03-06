const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";
	data.phone = !isEmpty(data.phone) ? data.phone : "";

	// Name checks
	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}

	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required";
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	// Phone number checks
	if (Validator.isEmpty(data.phone)) {
		errors.phone = "Phone number required";
	}

	if (!Validator.isLength(data.phone, { min: 10, max: 10 })) {
		errors.phone = `Please provide the 10 digit Phone number ${data.phone.length}`;
	}

	// Role checks
	if (Validator.isEmpty(data.phone)) {
		errors.phone = "Role should not be empty";
	}

	if (!Validator.equals(data.role, "Admin")) {
		if (!Validator.equals(data.role, "User")) {
			errors.role = "Role should be either user or admin";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
