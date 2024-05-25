const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

// Model
const User = require('../models/User');

module.exports = {
	sign_in: [
		body('username')
			.trim()
			.isLength({ min: 4 })
			.withMessage('Username is too short')
			.custom(async (username) => {
				try {
					const checkUser = await User.findOne({ username: username });
					if (checkUser) {
						throw new Error('Username already exist');
					}
				} catch (error) {
					throw new Error(error);
				}
			}),

		body('email')
			.trim()
			.isEmail()
			.withMessage('Invalid Email')
			.custom(async (email) => {
				try {
					const checkEmail = await User.findOne({ email: email });
					if (checkEmail) {
						throw new Error('Email already exist');
					}
				} catch (error) {
					throw new Error(error);
				}
			}),

		body('password')
			.trim()
			.isLength({ min: 4 })
			.withMessage('Password atleast 4 words long'),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(401).json(errors.array());
				return next(errors);
			}

			const user = new User({
				username: req.body.username,
				email: req.body.email,
				password: await bcrypt.hash(req.body.password, 12),
			});

			await user.save();
			return res.status(201).json({
				msg: 'User created succesfully',
			});
		}),
	],

	log_in: asyncHandler(async (req, res, next) => {
		passport.authenticate('local', { session: false }, (err, user, info) => {
			if (err || !user) {
				res.status(401).json(info);
				return next(err);
			}

			req.login(user, { session: false }, (err) => {
				if (err) return next(err);

				const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
					expiresIn: '1d',
				});

				return res.status(200).json({ token, user });
			});
		})(req, res, next);
	}),
};

