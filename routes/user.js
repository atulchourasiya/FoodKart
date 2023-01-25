const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/adduser', async (req, res) => {
	try {
		const { email, name } = req.body;
		const user = new User({
			email,
			name,
		});
		const savedUser = await user.save();
		res.status(200).json(savedUser);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
