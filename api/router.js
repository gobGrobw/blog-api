const express = require('express');
const router = express.Router();

// Controllers
const blog_controller = require('./controllers/blogController');
const user_controller = require('./controllers/authController');

/**
 * 	BLOG ROUTES
 */

// Get all blogs
router.get('/blogs', blog_controller.get_blogs);

// Get specific blogs
router.get('/blogs/:id', blog_controller.get_specific_blog);

// Add blogs to database
router.post('/blogs/create', blog_controller.create_blog);

// Updates blog
router.put('/blogs/:id', blog_controller.update_blog);

// Delete blog
router.delete('/blogs/:id', blog_controller.delete_blog);

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
router.post('/blogs/:id/comments', (req, res) => {
	res.send('Post comment');
});

router.put('/blogs/:id/comments/:commentid', (req, res) => {
	res.send('Update comment');
});

// Delete comment
router.delete('/blogs/:id/comments/:commentid', (req, res) => {
	res.send('Deleted comment');
});

module.exports = router;

