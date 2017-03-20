var express = require('express');
var router = express.Router();
var knex = require('knex');
var cache = require('express-redis-cache')();


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
	.get('/', cache.route({expire: 5, prefix: 'home'}), (req, res, next) => {
		var authenticated;
		if (req.isAuthenticated()) {
			db('users')
			.where('id', req.user.id)
			.first()
			.then((user) => {
				db('events')
				.where('is_available', 1)
				.orderBy('events.id', 'desc')
				.then((events) => {
					db('users')
					.limit(10)
					.orderBy('users.clickCount', 'desc')
					.then((users)=> {
						res.render('index', {
							partials: {
								header: './partials/header',
								footer: './partials/footer',
								rank: './partials/rank',
								eventList: './partials/eventList'
							},
							title: '面杀网',
							events,
							users,
							nickname: user.nickname,
							id: user.id,
							username: user.username,
							authenticated: req.isAuthenticated(),
							rsvp: user.rsvp,
							currentUser: req.user.nickname,
							profilePic: req.user.profilePic
						})
					})
				})
				
			})
		} else {
			db('events')
			.where('is_available', 1)
			.orderBy('events.id', 'desc')
			.then((events) => {
				db('users')
				.limit(10)
				.orderBy('users.clickCount', 'desc')
				.then((users) => {
					res.render('index', {
						partials: {
							header: './partials/header',
							footer: './partials/footer',
							rank: './partials/rank',
							eventList: './partials/eventList'
						},
						title: '面杀网',
						events,
						users,
						nickname: null,
						authenticated: req.isAuthenticated()
					})
				})
			})
		}
	})





module.exports = router;
