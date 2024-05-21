function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		/**
		 * 	Get token from header
		 * 	Bearer format = "Bearer <TOKEN HERE>"
		 */
		const token = bearerHeader.split(' ')[1];
		req.token = token;
		next();
	} else {
		return res.sendStatus(403);
	}
}

module.exports = verifyToken;

