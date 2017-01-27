var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');

passport.use(new LocalStrategy(authenticate))

function authenticate(email, password, done) {
	db('users')
		.where('username', email)
		.first()
		.then((user) => {
			if (!user) {
				return done(null, false, {message: 'user not found'});
			}
			if (user.password !== password) {
				return done(null, false, {message: 'password does not match'});
			}
			done(null, user)
		}, done)
}


passport.serializeUser(function(user, done) {
	done(null, user.id)
})

passport.deserializeUser(function(id, done) {
	db('users')
		.where('id', id)
		.first()
		.then((user) => {
			done(null, user)
		}, done)
})