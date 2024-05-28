const { verifyToken } = require('./jwt');

const auth = async (req, res, next) => {
	const token = req.cookies.jwt_auth;
	try {
		if (!token) {
			return res.status(401).end();
		}
		verifyToken(token);
		next();
	} catch (err) {
		res.status(401).end();
	}
};

module.exports = { auth };
