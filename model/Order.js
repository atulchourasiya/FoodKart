const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
	orderId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	postalcode: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	houseno: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
	},
	paymentId: {
		type: String,
		required: true
	},
	paymentStatus: {
		type: String,
		enum : ['pending','success','failed'],
		required: true
	}
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
