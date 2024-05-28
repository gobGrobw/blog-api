const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./middleware/passport.js');

const app = express();

const apiRouter = require('./router.js');

// Establish connection with Database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((err) => {
		console.error(err);
	});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
	})
);

// Setting request handler
app.get('/', (req, res) => {
	res.redirect('/api');
});

app.use('/api', apiRouter);

// Turning server on
app.listen(8080, () => {
	console.log('Server online');
});

module.exports = app;