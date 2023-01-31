const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
	img: {
		type: String,
		required: true
	},
	heading: {
		type: String,
		require: true
	},
	btnText: {
		type: String,
		require: true
	},
	link: {
		type: String,
		require: true
	}
});
const Service = mongoose.model('service', ServiceSchema);
module.exports = Service;
