const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	date: {
		type: Number,
		required: true
	}
});

const Contact = mongoose.model('contact', ContactSchema);
module.exports = Contact;
