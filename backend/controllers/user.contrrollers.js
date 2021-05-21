const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../validator/util.jwt");
const validateRegisterInput = require("../validator/user.register.validator");
const validateLoginInput = require("../validator/user.login.calidator");
const jwt = require("jsonwebtoken");

// @route get /user
// @desc Get all users
// @access Private
exports.getAll = async (req, res, next) => {
	try {
		// Finding the data from DB
		const user = await User.find({});
		res.send({ user });
	} catch (error) {
		next(error);
	}
};

// @route POST /user/register
// @desc Register user
// @access Public
exports.register = async (req, res, next) => {
	try {
		// Form validation
		const { errors, isValid } = validateRegisterInput(req.body);

		// Check validation
		if (!isValid) {
			console.log(errors);
			return res.status(400).json(errors);
		}

		const userCheck = await User.findOne({ email: req.body.email });
		if (!userCheck) {
			const user = new User({ email: req.body.email, name: req.body.name, phone: req.body.phone, role: req.body.role, password: bcrypt.hashSync(req.body.password, 8) });

			const createdUser = await user.save();
			res.send({
				name: createdUser.name,
				email: createdUser.email,
				phone: createdUser.phone,
				role: createdUser.role,
				password: createdUser.password,
				token: generateToken(createdUser),
			});
		} else {
			res.status(401).send({ message: "User already exist" });
		}
	} catch (error) {
		if (error.isjoi === true) error.status = 422;
		next(error);
	}
};

// @route Delete /user/:id
// @desc Delete user
// @access Private
exports.deleteOne = async (req, res, next) => {
	try {
		const userId = req.params.id;
		//Find and Delete the user
		const deleteUser = await User.findByIdAndDelete(userId).exec();
		if (deleteUser) {
			await deleteUser.remove();
			res.send({ message: "User Deleted" });
		} else {
			res.send("Error in Deletion.");
		}
	} catch (error) {
		next(error);
	}
};

// @route Post /user/login
// @desc Login user
// @access Public
exports.login = async (req, res, next) => {
	try {
		// Form validation

		const { errors, isValid } = validateLoginInput(req.body);

		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const email = req.body.email;
		const password = req.body.password;

		// Find user by email
		User.findOne({ email }).then((user) => {
			// Check if user exists
			if (!user) {
				return res.status(404).json({ emailnotfound: "Email not found" });
			}

			// Check password
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (isMatch) {
					// User matched
					// Create JWT Payload

					const payload = {
						id: user.id,
						name: user.name,
					};

					// Sign token
					jwt.sign(
						payload,
						process.env.SECRET,
						{
							expiresIn: 31556926, // 1 year in seconds
						},
						(err, token) => {
							res.json({
								success: true,
								token: "Bearer " + token,
							});
						}
					);
				} else {
					return res.status(400).json({ passwordincorrect: "Password incorrect" });
				}
			});
		});
	} catch (error) {
		next(error);
	}
};
