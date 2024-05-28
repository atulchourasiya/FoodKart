const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	userid: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	}
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
