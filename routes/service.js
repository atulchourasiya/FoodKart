const express = require('express');
const router = express.Router();
const Service = require('../model/Service');

// router.post('/addallservice', async (req, res) => {
// 	try {
// 		console.log(req.body.service);
// 		const service = Service.insertMany(req.body.service);
// 		res.status(200).json(service);
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send('Internal Server Error');
// 	}
// });

router.get('/fetchservice', async (req, res) => {
	try {
		let service = await Service.find();
		service = service.map((item) => {
			let { img, heading, btnText, link } = item;
			return { img, heading, btnText, link };
		});
		res.json(service);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
