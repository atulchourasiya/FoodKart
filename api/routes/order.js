const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const { auth } = require('../middleware/reqAuth');

router.post('/addorder', auth, async (req, res) => {
	try {
		const { orderId, user, name, amount, mobile, address, postalcode, houseno, razorpay_order_id , paymentStatus , paymentAmount} = req.body;
		const order = new Order({
			orderId,
			user,
			name,
			amount,
			mobile,
			address,
			postalcode,
			houseno,
			razorpay_order_id,
			paymentStatus,
			paymentAmount
		});
		const savedOrder = await order.save();
		res.status(200).json(savedOrder);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/getpaymentstatus', auth, async (req, res) => {
	try {
		const orders = await Order.find({ razorpay_order_id: req.body.razorpay_order_id });
		res.status(200).json({paymentStatus : orders[0].paymentStatus});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
