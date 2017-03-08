var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(authenticate))
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register))


// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
passport.use(new FacebookStrategy({
    clientID: '1877134315835669',
    clientSecret: '92394ccc224f9f1197054203cba0e8e9',
    callbackURL: "http://www.egiang.com/auth/facebook/callback",
    profileFields: ['email', 'profileUrl', 'gender', 'photos', 'displayName']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    db('users')
    	.where('auth_provider', "facebook")
    	.where('auth_id', profile.id)
    	.first()
    	.then((user) => {
    		if (user) {
    			return cb(null, user)
    		}

    		var newUser = {
    			auth_provider: "facebook",
    			auth_id: profile.id,
    			nickname: profile.displayName,
    			profilePic: profile.photos[0].value,
    			gender: profile.gender,
    			username: profile.emails[0].value
    		}
    		return db('users')
    		.insert(newUser)
    		.then((ids) => {
    			newUser.id = ids[0]
    			cb(null, newUser)
    		})
    	})
  }
));

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
				gender: req.body.gender,
				profilePic: 'profilePic/default.jpg'
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