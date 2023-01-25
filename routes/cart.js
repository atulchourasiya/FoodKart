const express = require('express');
const router = express.Router();
const Cart = require('../model/Cart');

router.post('/addproduct', async (req, res) => {
	try {
		const { img, price, description, name, user, quantity,productid } = req.body;
		const cartProduct = new Cart({
			img,
			user,
			quantity,
			price,
			description,
			name,
			productid
		});
		const addedProduct = await cartProduct.save();
		res.status(200).json(addedProduct);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.put('/updateproduct/:id', async (req, res) => {
	try {
		const { img, price, description, name, user, quantity, productid } = req.body;
		let isVerified = false;
		const updatedCartProduct = {};

		if (img !== undefined) {
			updatedCartProduct.img = img;
		}
		if (price !== undefined) {
			updatedCartProduct.price = price;
		}
		if (description !== undefined) {
			updatedCartProduct.description = description;
		}
		if (user !== undefined) {
			updatedCartProduct.user = user;
		}
		if (name !== undefined) {
			updatedCartProduct.name = name;
		}
		if (quantity !== undefined) {
			updatedCartProduct.quantity = quantity;
		}
		if (productid !== undefined) {
			updatedCartProduct.productid = productid;
		}

		const existingProduct = await Cart.findById(req.params.id);
		if (!existingProduct) {
			return res.status(404).send('Not Found');
		}

		if (existingProduct.user === req.body.user) {
			isVerified = true;
		}

		if (!isVerified) {
			return res.status(404).send('Not Found');
		}

		const updatedProduct = await Cart.findByIdAndUpdate(
			req.params.id,
			{ $set: updatedCartProduct },
			{ new: true }
		);
		res.json(updatedProduct);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/fetchproduct', async (req, res) => {
	try {
		const cartProducts = await Cart.find({ user: req.body.user });
		res.json(cartProducts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.delete('/deleteproduct/:id', async (req, res) => {
	try {
		const existingProduct = await Cart.findById(req.params.id);
		let isVerified = false;

		if (!existingProduct) {
			return res.status(404).send('Not Found');
		}

		if (existingProduct.user === req.body.user) {
			isVerified = true;
		}

		if (!isVerified) {
			return res.status(404).send('Not Found');
		}

		const deletedProduct = await Cart.findByIdAndDelete(req.params.id);
		res.json(deletedProduct);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
