const express = require('express');
const router = express.Router();
const Category = require('../model/Category');

// router.post('/addacategory', async (req, res) => {
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
		const category = await Category.find();
		res.json(category);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});


module.exports = router;
