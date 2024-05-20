const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Model
const User = require('./models/User');

// Log in strategy
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			// Check if username is correct
			const user = await User.findOne({ username: username });
			if (!user) return done(null, false, { message: 'Incorrect username' });

			// Check if password match account
			const match = bcrypt.compare(password, user.password);
			if (!match) return done(null, false, { message: 'Incorrect password' });

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);

module.exports = passport;
