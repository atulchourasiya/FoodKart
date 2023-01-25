const express = require('express');
const router = express.Router();
const Menu = require('../model/Menu');

// router.post('/addamenu', async (req, res) => {
// 	try {
// 		const { img, category, price, description, categoryName, name, productid } = req.body;
// 		const menu = new Menu({
// 			img,
// 			category,
// 			price,
// 			description,
// 			categoryName,
// 			name,
// 			productid
// 		});
// 		const savedMenu = await menu.save();
// 		res.status(200).json(savedMenu);
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send('Internal Server Error');
// 	}
// });

router.get('/fetchmenu', async (req, res) => {
	try {
		const menu = await Menu.find();
		res.json(menu);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
