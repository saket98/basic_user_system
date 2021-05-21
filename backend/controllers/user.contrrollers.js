const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../validator/util.jwt");
const validateRegisterInput = require("../validator/user.register.validator");

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

/* exports.putOne = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST);
		const userId = req.params.userId;
		const response = { payLoad: {}, message: "" };
		const userAccount = await User.findById(userId).exec();
		if (!userAccount) throw new APIError(`No user associated with id: ${userId}`, httpStatus.NOT_FOUND);
		const role = userAccount.role;
		const user = role === "applicant" ? Applicant : Recruiter;
		let userDetails = await user.findOne({ id: userId }).exec();
		for (const key in req.body) {
			if (user.schema.obj.hasOwnProperty(key) && key !== "id" && key !== "_id") {
				userDetails[key] = req.body[key];
			}
		}
		const updatedUserDetails = await userDetails.save();
		if (updatedUserDetails) {
			response.message = "SUCCESS";
			response.payLoad = updatedUserDetails;
			res.status(httpStatus.OK);
			res.send(response);
		} else {
			throw new APIError(`User with id: ${userId} not updated`, httpStatus.NOT_FOUND);
		}
	} catch (error) {
		next(error);
	}
};

exports.deleteOne = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST);
		const userId = req.params.userId;
		const response = { payLoad: {}, message: "" };
		const userAccount = await User.findById(userId).exec();
		if (!userAccount) throw new APIError(`No user associated with id: ${userId}`, httpStatus.NOT_FOUND);
		const role = userAccount.role;
		const user = role === "applicant" ? Applicant : Recruiter;
		const deleteAccount = await User.findByIdAndDelete(userId).exec();
		const deleteResult = await user.findOneAndDelete({ id: userId }).exec();
		if (deleteAccount && deleteResult) {
			response.message = "SUCCESS";
			res.status(httpStatus.OK);
			res.send(response);
		} else {
			throw new APIError(`User with id: ${userId} not deleted`, httpStatus.NOT_FOUND);
		}
	} catch (error) {
		next(error);
	}
}; */
