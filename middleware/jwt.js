const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (token) => {
	try {
		const jwToken = jwt.verify(token, process.env.JWT_SECRET);
		return jwToken.userid;
	} catch (err) {
		 throw err
	}
};

exports.signToken = (email) => {
	try {
		const token = jwt.sign({ email }, process.env.JWT_SECRET, {
			expiresIn: '12h'
		});
		return token;
	} catch (err) {
		throw err;
	}
};
