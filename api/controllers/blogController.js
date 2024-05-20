const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Model
const Blog = require('../models/Blog');

module.exports = {
	get_blogs: asyncHandler(async (req, res) => {
		const blogs = await Blog.find().exec();

		return res.status(200).json({
			payload: blogs,
		});
	}),

	get_specific_blog: asyncHandler(async (req, res) => {
		try {
			const id = req.params.id;
			const blog = await Blog.findById(id).exec();
			const status = blog === null ? 204 : 200;

			return res.status(status).json({
				payload: blog,
			});
		} catch (error) {
			res.status(404).json({
				payload: error,
			});
		}
	}),

	create_blog: [
		body('title')
			.trim()
			.isLength({ min: 1 })
			.withMessage('Title is required')
			.escape(),
		body('message')
			.trim()
			.isLength({ max: 250 })
			.withMessage('Message is too long')
			.escape(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(401).json({ error: errors.array() });
				return next(errors);
			}

			const blog = new Blog({
				title: req.body.title,
				message: req.body.message,
				user: req.user._id,
				date: new Date(),
			});

			await blog.save();
			return res.status(201).json({ msg: 'POST success' });
		}),
	],

	update_blog: [
		body('title')
			.trim()
			.isLength({ min: 1 })
			.withMessage('Title is required')
			.escape(),
		body('message')
			.trim()
			.isLength({ max: 250 })
			.withMessage('Message is too long')
			.escape(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(401).json({ error: errors.array() });
				return next(errors);
			}

			const blog = new Blog({
				_id: req.params.id,
				title: req.body.title,
				message: req.body.message,
				date: new Date(),
			});

			await Blog.findByIdAndUpdate(req.params.id, blog);
			return res.status(201).json({ msg: 'PUT success' });
		}),
	],

	delete_blog: asyncHandler(async (req, res, next) => {
		try {
			await Blog.findByIdAndDelete(req.params.id);
			return res.status(202).json({ msg: 'DELETE success' });
		} catch (error) {
			return res.status(404).json({
				error,
				msg: `BLOG:${req.params.id} NOT FOUND`,
			});
		}
	}),
};

