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
			.orderBy('gamerSerial')
			.then((gamers)=> {
				db('gamesData')
					.where('gameId', gameId)
					.then((gamesData)=> {
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
							gamesData,
							message: req.flash('msg3')
						})
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
		.post('/addRecord:gameId', loginRequired, (req, res, next) => {
			const gameId = req.params.gameId;
			
			db('gamesData')
				.where('gameId', gameId)
				.then((gameSeries)=> {
					var newGameData = {
							gameId: gameId,
							gameSerial: gameSeries.length + 1,
							player1: req.body.winOrLose1,
							player1Role: req.body.roles1,
							player2: req.body.winOrLose2,
							player2Role: req.body.roles2,
							player3: req.body.winOrLose3,
							player3Role: req.body.roles3,
							player4: req.body.winOrLose4,
							player4Role: req.body.roles4,
						}
					
					db('gamesData')
						.insert(newGameData)
						.then((ids) => {
							newGameData.id = ids[0]
						}).then(()=> {
							res.redirect('/game' + gameId)
						})
				})
		})



module.exports = router;
