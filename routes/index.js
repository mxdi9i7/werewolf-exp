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



/* GET home page. */
router
	.get('/', (req, res, next) => {
		if (req.isAuthenticated()) {
			db('users')
			.where('id', req.user.id)
			.then((users) => {
				db('events')
				.orderBy('events.id', 'desc')
				.then((events) => {
					console.log(users[0].nickname);
					res.render('index', {
						partials: {
							header: './partials/header',
							footer: './partials/footer'
						},
						title: '面杀网',
						events,
						nickname: users[0].nickname,
						id: users[0].id,
						username: users[0].username
					})
				})
				
			})
		} else {
			db('events').orderBy('events.id', 'desc')
			.then((events) => {
				res.render('index', {
					partials: {
						header: './partials/header',
						footer: './partials/footer'
					},
					title: '面杀网',
					events,
					nickname: null
				})
				console.log(res.nickname);
			})
		}
	})



module.exports = router;
