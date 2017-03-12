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
	.get('/login', (req, res, next) => {
			res.render('login', {
				partials: {
					header: './partials/header',
					footer: './partials/footer'
				},
				authenticated: req.isAuthenticated(),
				message: req.flash('msg1')
			})
	})
	.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}))
	.get('/logout', (req, res, next) => {
		req.session.destroy(() => {
			res.redirect('/')
		})
	})
	.get('/auth/facebook',
		  passport.authenticate('facebook', { scope: 'public_profile' })
	)

	.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	  })

	.get('/auth/google', passport.authenticate('google'))

	.get('/auth/google/return', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	  })


module.exports = router;