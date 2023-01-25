const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Insta = require('instamojo-nodejs');
const url = require('url');
require('dotenv').config();

router.post('/pay', (req, res) => {
	Insta.setKeys(process.env.PAYMENT_KEY, process.env.PAYMENT_TOKEN);

	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);
   console.log(req.body.redirect_url);
	data.purpose = req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name = req.body.buyer_name;
	data.redirect_url = req.body.redirect_url;
	data.email = req.body.email;
	data.phone = req.body.phone;
	data.send_email = false;
	data.webhook = req.body.webhook;
	data.allow_repeated_payments = false;
try {
   
	Insta.createPayment(data, function (error, response) {
		if (err) {
			throw new error('err') 
		} else {
			const responseData = JSON.parse(response);
         console.log(responseData)
			const redirectUrl = responseData.payment_request.longurl;
			res.status(200).json({ "paymenturl": redirectUrl });
		}
	});
} catch (error) {
   
}
});

router.get('/callback/', (req, res) => {
	let url_parts = url.parse(req.url, true),
		responseData = url_parts.query;
      if (responseData.payment_id) {
      console.log(responseData)
		// let userId = responseData.user_id;

		// // Save the info that user has purchased the bid.
		// const bidData = {};
		// bidData.package = 'Bid100';
		// bidData.bidCountInPack = '10';

		// User.findOneAndUpdate({ _id: userId }, { $set: bidData }, { new: true })
		// 	.then((user) => res.json(user))
		// 	.catch((errors) => res.json(errors));

		return res.redirect(`${process.env.CLIENT_URL}/payment-complete`);
	}
});

module.exports = router;
