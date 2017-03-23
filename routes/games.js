var express = require('express');
var router = express.Router();
var knex = require('knex');


const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'jjnn123',
    database: 'test',
  }
})


function loginRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next()
}

/* GET home page. */
router
	.get('/games', loginRequired, (req, res, next) => {
		db('games')
		.then((games) => {
			res.render('games',{
				partials: {
					header: './partials/header',
					footer: './partials/footer'
				},
				nickname: req.user.nickname,
				authenticated: req.isAuthenticated(),
				currentUser: req.user.nickname,
				profilePic: req.user.profilePic,
				games,
			})
		})
	})
	.get('/games/:gameId', loginRequired, (req, res, next) => {
		const { gameId } = req.params;
		res.render('games',{
			partials: {
				header: './partials/header',
				footer: './partials/footer'
			},
			nickname: req.user.nickname,
			authenticated: req.isAuthenticated(),
			currentUser: req.user.nickname,
			profilePic: req.user.profilePic			

		})
	})





module.exports = router;
