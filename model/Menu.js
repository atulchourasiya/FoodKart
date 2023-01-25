const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
	img: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	categoryName: {
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

const Menu = mongoose.model('menu', MenuSchema);
module.exports = Menu;
