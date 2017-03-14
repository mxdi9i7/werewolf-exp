var express = require('express');
var router = express.Router();
var knex = require('knex');



const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'test',
  }
})

function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next()
}

router
	.get('/tournament', loginRequired, (req, res, next) => {
		res.render('tournament', {
				partials: {
					header: './partials/header',
					footer: './partials/footer',
					tournamentList: './partials/tournamentList',
					rank: './partials/rank'
					},
				currentUser: req.user.nickname,
				profilePic: req.user.profilePic,
				authenticated: req.isAuthenticated(),
		})
	})

module.exports = router;
