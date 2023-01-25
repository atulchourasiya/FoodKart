const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
	img: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	productid: {
		type: String,
		required: true
	}
});

const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;
