const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const { auth } = require('../middleware/reqAuth');

router.post('/addorder', async (req, res) => {
	try {
		const { orderId, user,name, amount, mobile, address, postalcode, houseno } = req.body;
		const order = new Order({
			orderId,
			user,
			name,
			amount,
			mobile,
			address,
			postalcode,
			houseno
		});
		const savedOrder = await order.save();
		res.status(200).json(savedOrder);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
