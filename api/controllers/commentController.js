const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Model
const Comment = require('../models/Comment');

module.exports = {
	get_blog_comments: asyncHandler(async (req, res) => {
		const comments = await Comment.find({ blog: req.params.id })
			.populate('author', 'username')
			.sort({ date: -1 })
			.exec();

		console.log(comments);
		res.status(200).json(comments);
	}),

	post_comment: [
		body('message')
			.trim()
			.isLength({ min: 1 })
			.withMessage('Comment is too short')
			.escape(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return next(errors);

			const comment = new Comment({
				author: req.body.user._id,
				message: req.body.message,
				blog: req.body.blogid,
				date: new Date(),
			});

			await comment.save();
			return res.status(200).json({
				message: 'Comment post success',
			});
		}),
	],

	update_comment: [
		body('message').trim().escape(),
		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return next(errors);

			const updatedComment = new Comment({
				_id: req.params.commentid,
				message: req.body.message,
				date: new Date(),
			});

			await Comment.findByIdAndUpdate(req.params.commentid, updatedComment);
			return res.status(200).json({
				message: 'Update comment success',
			});
		}),
	],

	delete_comment: asyncHandler(async (req, res, next) => {
		await Comment.findByIdAndDelete(req.params.commentid);
		res.status(200).json({
			message: 'Delete comment success',
		});
	}),
};

