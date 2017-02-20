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
	.post('/profilePic', loginRequired, upload.single('profilePic'), (req, res, next)=> {
		db('users')
		.where('id', req.user.id)
		.first()
		.then((user)=> {
			db('users')
			.where('id', req.user.id)
			.first()
			.update({
				profilePic: req.file.filename
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
				if (user.profilePic === null) {
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
							footer: './partials/footer',
							profile: './partials/defaultProfile'
						},
						authenticated: req.isAuthenticated(),
						person: '我'
					})	
				} else {
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
							footer: './partials/footer',
							profile: './partials/profile'
						},
						authenticated: req.isAuthenticated(),
						person: '我'
					})	
				}
				
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
				console.log(typeof user.profilePic)
				db('users')
				.where('id', id)
				.update({
					clickCount: count
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
						if (user.profilePic === null) {
								res.render('users', {
										partials: {
											header: './partials/header',
											footer: './partials/footer',
											profile: './partials/defaultProfile'
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
										own: identity
								})
							} else {
								res.render('users', {
										partials: {
											header: './partials/header',
											footer: './partials/footer',
											profile: './partials/profile'
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
										own: identity
								})
							}
						})
					})
				})
			})
		})


module.exports = router;
