const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			role: user.role,
		},
		process.env.SECRET,
		{
			expiresIn: "30d",
		}
	);
};

const isAuth = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		const onlyToken = token.slice(7, token.length);
		jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
			if (err) {
				return res.status(401).send({ message: "Invalid Token" });
			}
			req.user = decode;
			next();
			return;
		});
	} else {
		return res.status(401).send({ message: "Token is not supplied." });
	}
};

module.exports = { generateToken, isAuth };
