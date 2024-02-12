const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const menu = require('./routes/menu');
const cart = require('./routes/cart');
const reservation = require('./routes/reservation');
const category = require('./routes/category');
const contact = require('./routes/contact');
const testimonial = require('./routes/testimonial');
const service = require('./routes/service');
const user = require('./routes/user');
const order = require('./routes/order');
const payment = require('./routes/payment.js');
const connectToMongoose = require('./config.js/mongo');
const uploader = require('./middleware/multer.js');

const app = express();
const PORT = process.env.PORT || 5000;
connectToMongoose();
app.use(
	session({
		secret: `${process.env.SECRET}`,
		resave: false,
		saveUninitialized: false
	})
);
app.use(
	cors({
		origin: `${process.env.CLIENT_URL}`,
		methods: 'GET,POST,PUT,DELETE',
		credentials: true
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/menu', menu);
app.use('/cart', cart);
app.use('/reservation', reservation);
app.use('/category', category);
app.use('/contact', contact);
app.use('/testimonial', testimonial);
app.use('/service', service);
app.use('/order', order);
app.use('/user', user);
app.use('/payment', payment);

app.post('/single', uploader.single('image'), (req, res) => {
	if (req.file) {
		res.send(req.file);
	} else {
		res.status(400).send('Please upload a valid image');
	}
});

app.post('/multiple', uploader.array('images', 20), (req, res) => {
	if (req.files) {
		res.send(req.files);
	} else {
		res.status(400).send('Please upload a valid images');
	}
});
// app.get('/*', function (req, res) {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, () => {
	console.log(`Congrats! your server is listening on port ${PORT}`);
});
