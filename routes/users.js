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
var count = 1;
////////////Your own profile//////////////////
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
			db('users')
			.where('id', req.user.id)
			.first()
			.then((user)=> {
				res.render('users', {
						user,
						currentUser: user.nickname,
						identity: function() {
							if (user.identity == 1) {
								return "管理员"
							} else {
								return "普通用户"
							}
						},
						title: user.id + "的主页",
						events,
						partials: {
							header: './partials/header',
							footer: './partials/footer'
						},
						authenticated: req.isAuthenticated(),
						person: '我'
					})	
				})		
			})
		})

////////////Other people's profile//////////////////
	.get('/user:id', loginRequired, (req,res,next) => {
		const { id } = req.params;
		count += 18;
		db('events')
		.where('user_id', id)
		.then((events) => {
			db('users')
			.where('id', id)
			.first()
			.then((user) => {
				db('users')
				.where('id', id)
				.update({
					clickCount: count
				})
				.then((user)=> {
					db('users')
					.where('id', id)
					.first()
					.then((user)=>{
						res.render('users', {
								partials: {
									header: './partials/header',
									footer: './partials/footer'
								},
								title: '面杀网',
								user,
								events,
								identity: function() {
									if (user.is_admin == 1) {
										return '管理员'
									} else {
										return '普通用户'
									}
								},
								authenticated: req.isAuthenticated(),
								person: function() {
									if (req.user.id == id) {
										return '我'
									} else {
										return '他'
									}
								},
								currentUser: req.user.nickname
						})
					})
				})
			})
		})
	})


module.exports = router;
