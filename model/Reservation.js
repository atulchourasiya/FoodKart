const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
   user:{
      type:String,
      required:true
   },
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	seat: {
		type: String,
		required: true
	},
	request: {
		type: String,
	}
});

const Reservation = mongoose.model('reservation', ReservationSchema);
module.exports = Reservation;
