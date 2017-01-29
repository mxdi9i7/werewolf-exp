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
			}
		})
	})
	.post('/login', passport.authenticate('local', {
		successRedirect: '/status',
		failureRedirect: '/login',
	}))



module.exports = router;