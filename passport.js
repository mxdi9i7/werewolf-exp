var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');

passport.use(new LocalStrategy(authenticate))
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register))

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

function register(req, email, password, done) {
	db('users')
		.where('username', email)
		.first()
		.then((user) => {
			if(user) {
				return done(null, false, {message: '用户已存在'})
			}
			if (password !== req.body.password2) {
				return done(null, false, {message: 'passwords dont match'})
			}
			const newUser = {
				nickname: req.body.nickname,
				username: req.body.username,
				password: req.body.password,
				profilePic: 'default.jpg'
			};

			db('users')
				.insert(newUser)
				.then((ids) => {
					newUser.id = ids[0]
					done(null, newUser)
				})
		})
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