const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
	img: {
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
	}
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;
