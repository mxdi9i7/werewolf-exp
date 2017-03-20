var express = require('express');
var router = express.Router();
var knex = require('knex');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profilePic')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage })


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

////////////Your own profile//////////////////
router
	.post('/profilePic', loginRequired, upload.single('profilePic'), (req, res, next)=> {
		db('users')
		.where('id', req.user.id)
		.first()
		.then((user)=> {
			db('users')
			.where('id', req.user.id)
			.first()
			.update({
				profilePic: 'profilePic/' + req.file.filename
			})
			.then(()=> {
				console.log(req.file)
				res.redirect('/users')
			})
		})
	})
	.post('/users', loginRequired, (req, res, next) => {
		db('users')
		.where('id', req.user.id)
		.first()
		.then((user) => {
			db('users')
			.where('id', req.user.id)
			.first()
			.update({
				nickname: req.body.nickname
			})
			.then(()=> {
				res.redirect('/users')
			})
		})
	})
	.get("/users", loginRequired, (req, res, next) => {
		db('events')
		.where('user_id', req.user.id)
		.where('is_available', 1)
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
					console.log(user)
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
						person: '我',
						profilePic: req.user.profilePic,
					})
				})		
			})
		})
////////////Other people's profile//////////////////
	.get('/user:id', loginRequired, (req,res,next) => {
		const { id } = req.params;
		db('events')
		.where('user_id', id)
		.where('is_available', 1)
		.then((events) => {
			db('users')
			.where('id', id)
			.first()
			.then((user) => {
				db('users')
				.where('id', id)
				.update({
					clickCount: user.clickCount + 18
				})
				.then((user)=> {
					var identity;
					if (req.user.id !== id) {
						identity = "notOwned"
					} else {
						identity = "owned"
					}
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
										currentUser: req.user.nickname,
										own: identity,
										profilePic: req.user.profilePic,
							})
						})
					})
				})
			})
		})


module.exports = router;
