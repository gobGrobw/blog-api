const express = require('express');
const router = express.Router();

// Controllers
const blog_controller = require('./controllers/blogController');
const user_controller = require('./controllers/authController');
const comment_controller = require('./controllers/commentController');

// Middleware
const verifyToken = require('./middleware/verifyToken');

/**
 * 	BLOG ROUTES
 */

// Get all blogs
router.get('/blogs', blog_controller.get_blogs);

// Get specific blogs and comments
router.get('/blogs/:id', blog_controller.get_specific_blog);

// Create blogs
router.post('/blogs', verifyToken, blog_controller.create_blog);

// Updates blog
router.put('/blogs/:id', verifyToken, blog_controller.update_blog);

// Delete blog
router.delete('/blogs/:id', verifyToken, blog_controller.delete_blog);

/**
 * 	USER ROUTES
 */

// Signing in
router.post('/sign-in', user_controller.sign_in);

// Log in
router.post('/log-in', user_controller.log_in);

/**
 * 	COMMENT ROUTES
 */

// Post comment
router.post('/blogs/:blogid/comment', verifyToken, comment_controller.post_comment);

// Update comment
router.patch(
	'/blogs/:blogid/comment/:commentid',
	verifyToken,
	comment_controller.update_comment
);

// Delete comment
router.delete(
	'/blogs/:blogid/comment/:commentid',
	verifyToken,
	comment_controller.delete_comment
);

module.exports = router;

