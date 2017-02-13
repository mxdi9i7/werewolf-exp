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
	.get("/users", loginRequired, (req, res, next) => {
		db('events')
		.where('user_id', req.user.id)
		.then((events) => {
			var identity;
			if (req.user.is_admin == 1) {
				identity = '管理员'
			} else {
				identity = '普通用户'
			}
			res.render('users', {
					nickname: req.user.nickname,
					email: req.user.username,
					identity: identity,
					id: req.user.id,
					host_id: req.user.id,
					title: 'Your posts',
					events,
					partials: {
						header: './partials/header',
						footer: './partials/footer'
					}
				})			
			})
	})


module.exports = router;
