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
	.get('/game:gameId', loginRequired, (req, res, next) => {
		const { gameId } = req.params;
		db('games')
		.where('id', gameId)
		.first()
		.then((game)=> {
			db('gamersData')
			.where('gameId', gameId)
			.then((gamers)=> {
				res.render('gamePage',{
					partials: {
						header: './partials/header',
						footer: './partials/footer'
					},
					nickname: req.user.nickname,
					authenticated: req.isAuthenticated(),
					currentUser: req.user.nickname,
					profilePic: req.user.profilePic,
					game,
					gamers,
					message: req.flash('msg3')
				})
			
			})
		})
	})
	.post('/game:gameId', loginRequired, (req, res, next)=> {
		const gameId = req.params.gameId;
		db('gamersData')
		.where('gameId', gameId)
		.then((gamers)=> {
			db('users')
				.where('id', req.body.gamerId)
				.first()
				.then((user)=> {
					db('gamersData')
						.where('userId', req.body.gamerId)
						.then((duplicatedGamers)=> {
							var gamerSerial = gamers.length + 1;
							if (user && duplicatedGamers.length == 0) {
								var newGamer = {
										userId: req.body.gamerId,
										gameId: gameId,
										gamePoints: 0,
										gamerSerial: gamerSerial,
										gamerNickname: user.nickname,
										gamerProfile: user.profilePic,
										gamerGender: user.gender
								}
								db('gamersData')
								.insert(newGamer)
								.then((ids) => {
							        newGamer.id = ids[0];
							    }).then(()=> {
							        res.redirect('/game' + gameId)
								})
							} else if (duplicatedGamers.length !== 0){
								db('gamersData')
								.where('gameId', gameId)
								.then((gamers)=> {
									res.render('gamePage',{
										partials: {
											header: './partials/header',
											footer: './partials/footer'
										},
										nickname: req.user.nickname,
										authenticated: req.isAuthenticated(),
										currentUser: req.user.nickname,
										profilePic: req.user.profilePic,
										gamers,
										message: '用户名重复！!'
									})
								})
							}else {
								db('gamersData')
								.where('gameId', gameId)
								.then((gamers)=> {
									res.render('gamePage',{
										partials: {
											header: './partials/header',
											footer: './partials/footer'
										},
										nickname: req.user.nickname,
										authenticated: req.isAuthenticated(),
										currentUser: req.user.nickname,
										profilePic: req.user.profilePic,
										gamers,
										message: '用户不存在!'
									})
								})
							}
						})
		        })
			})
		})




module.exports = router;
