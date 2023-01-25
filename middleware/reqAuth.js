const { verifyToken } = require('./jwt');
const User = require('../model/User');

const auth = async (req, res, next) => {
	const token = req.cookies.jwt_auth;
	try {
		if (!token) {
			return res.status(401).end();
		}
		const signedUserId = verifyToken(token);
		const { name, email } = await User.findById({ _id: signedUserId });
		req.user = { name, email};
		next();
	} catch (err) {
		res.status(401).end();
	}
};

module.exports = { auth };
