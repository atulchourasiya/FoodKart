const express = require('express');
const { signToken } = require('../middleware/jwt');
const router = express.Router();
const User = require('../model/User');
const { auth } = require('../middleware/reqAuth');

router.post('/adduser', async (req, res) => {
	try {
		const { email, name, userid } = req.body;
		const user = new User({
			email,
			name,
			userid
		});
		await user.save();
		const token = signToken(req.body.email);
		res
			.cookie('jwt_auth', token, {
				maxAge: 70 * 60 * 1000,
				sameSite: 'strict',
				secure: true,
				httpOnly: true
			})
			.send();
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/gettoken', async (req, res) => {
	try {
		const user = await User.findOne({ userid: req.body.userid });
		if (user) {
			const token = signToken(req.body.userid);
			res
				.cookie('jwt_auth', token, {
					maxAge: 70 * 60 * 1000,
					sameSite: 'strict',
					secure: true,
					httpOnly: true
				})
				.send();
		} else {
			res.status(401).end();
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.get('/checktoken', auth, async (req, res) => {
	try {
		res.status(200).end();
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
