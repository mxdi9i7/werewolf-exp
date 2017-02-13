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

		
		db('events').orderBy('events.id', 'desc')
		.then((events) => {
			db('users')
			.where('id', req.user.id)
			.then((users) => {
				console.log(users.nickname);
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
	})



module.exports = router;
