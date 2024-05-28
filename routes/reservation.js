const express = require('express');
const router = express.Router();
const Reservation = require('../model/Reservation');
const { auth } = require('../middleware/reqAuth');

router.post('/addreservation', auth, async (req, res) => {
	try {
		const { user, firstname, lastname, mobile, date, time, seat, request } = req.body;
		const reservation = new Reservation({
			user,
			firstname,
			lastname,
			mobile,
			date,
			time,
			seat,
			request
		});
		const savedReservation = await reservation.save();
		res.status(200).json(savedReservation);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
