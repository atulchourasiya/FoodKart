const express = require('express');
const router = express.Router();
const Category = require('../model/Category');
const { auth } = require('../middleware/reqAuth');

// router.post('/addacategory',async (req, res) => {
// 	try {
// 		const { img, category, categoryName } = req.body;
// 		const newCategory = new Category({
// 			img,
// 			category,
// 			categoryName
// 		});
// 		const savedCategory = await newCategory.save();
// 		res.status(200).json(savedCategory);
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send('Internal Server Error');
// 	}
// });

router.get('/fetchcategory', async (req, res) => {
	try {
		let category = await Category.find();
		category = category.map((item) => {
			let { img, category, categoryName } = item;
			return { img, category, categoryName };
		});
		res.json(category);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
