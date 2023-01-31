const express = require('express');
const router = express.Router();
const Testimonial = require('../model/Testimonial');

router.post('/addalltestimonial',async (req, res) => {
	try {
		console.log(req.body.testimonial)
		const testimonial = Testimonial.insertMany(req.body.testimonial)
		res.status(200).json(testimonial);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.get('/fetchtestimonial', async (req, res) => {
	try {
		let testimonial = await Testimonial.find();
		testimonial = testimonial.map((item) => {
			let { img, desination, name, testimonial } = item;
			return { img, desination, name, testimonial };
		});
		res.json(testimonial);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
