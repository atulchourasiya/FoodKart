const express = require('express');
const router = express.Router();
const Contact = require('../model/Contact');

router.post('/addcontact', async (req, res) => {
	try {
		const { user, name, message, date } = req.body;
		const contact = new Contact({
			user,
			name,
			message,
         date
		});
		const savedContact = await contact.save();
		res.status(200).json(savedContact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/fetchlastcontact', async (req, res) => {
	try {
		const contact = await Contact.find({ user: req.body.user }).sort({ _id: -1 }).limit(1);
		res.status(200).json(contact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
