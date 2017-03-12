var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router
	.get('/status', (req, res, next) => {
		res.send({
			session: req.session,
			user: req.user,
			authenticated: req.isAuthenticated(),
		})
	})
	.get('/signup', (req, res, next) => {
		req.flash('info', 'test')
		res.render('signup', {
			partials: {
				header: './partials/header',
				footer: './partials/footer'
			},
			authenticate: req.isAuthenticated(),
			message: req.flash('msg')
		})
	})
	.post('/signup', passport.authenticate('local-register', {
		successRedirect: '/users',
		failureRedirect: '/signup',
		failureFlash: true
	}))



module.exports = router;