const mongoose = require('mongoose');

const TestimonialSchema = mongoose.Schema({
	img: {
		type: String,
		required: true
	},
	name: {
		type: String,
		require: true
	},
	desination: {
		type: String,
		require: true
	},
	testimonial: {
		type: String,
		require: true
	}
});
const Testimonial = mongoose.model('testimonial', TestimonialSchema);
module.exports = Testimonial;
