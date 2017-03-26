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
						var playerResultList = [];
						for (i = 1; i <= game.totalPlayers; i++) {
								playerResultList.push("<td><span class='playerRole'>{{player" + i + "Role}}</span> / <span class='playerGame'>{{player" + i + "}}</span></td>")
						}

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
							message: req.session.message,
							historyList: playerResultList
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
										gamerGender: user.gender,
										numberGames: 0
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
									res.redirect('game' + gameId)
									req.session.message = '用户名重复！'
								})
							}else {
								db('gamersData')
								.where('gameId', gameId)
								.then((gamers)=> {
									req.session.message = '用户名不存在！'
									res.redirect('game' + gameId)
								})
							}
						})
		        })
			})
		})
		.post('/addRecord:gameId', loginRequired, (req, res, next) => {
			const gameId = req.params.gameId;
			var points;
			var vars = {};
			db('gamesData')
				.where('gameId', gameId)
				.then((gameSeries)=> {
					function calculatePoint(winOrLose, role) {
						if (winOrLose == undefined || role == undefined) {
							return 0
						} else {
							return Number(winOrLose * role)
						}
					}
					var serialOfGame = gameSeries.length + 1;
					console.log('Game: ' + serialOfGame)
					var newGameData = {
							gameId: gameId,
							gameSerial: serialOfGame,
							player1: req.body.winOrLose1,
							player1Role: req.body.roles1,
							player1Point: calculatePoint(req.body.winOrLose1, req.body.roles1),
							player2: req.body.winOrLose2,
							player2Role: req.body.roles2,
							player2Point: calculatePoint(req.body.winOrLose2, req.body.roles2),
							player3: req.body.winOrLose3,
							player3Role: req.body.roles3,
							player3Point: calculatePoint(req.body.winOrLose3, req.body.roles3),
							player4: req.body.winOrLose4,
							player4Role: req.body.roles4,
							player4Point: calculatePoint(req.body.winOrLose4, req.body.roles4),
							player5: req.body.winOrLose5,
							player5Role: req.body.roles5,
							player5Point: calculatePoint(req.body.winOrLose5, req.body.roles5),
							player6: req.body.winOrLose6,
							player6Role: req.body.roles6,
							player6Point: calculatePoint(req.body.winOrLose6, req.body.roles6),
							player7: req.body.winOrLose7,
							player7Role: req.body.roles7,
							player7Point: calculatePoint(req.body.winOrLose7, req.body.roles7),
							player8: req.body.winOrLose8,
							player8Role: req.body.roles8,
							player8Point: calculatePoint(req.body.winOrLose8, req.body.roles8),
							player9: req.body.winOrLose9,
							player9Role: req.body.roles9,
							player9Point: calculatePoint(req.body.winOrLose9, req.body.roles9),
							player10: req.body.winOrLose10,
							player10Role: req.body.roles10,
							player10Point: calculatePoint(req.body.winOrLose10, req.body.roles10),
							player11: req.body.winOrLose11,
							player11Role: req.body.roles11,
							player11Point: calculatePoint(req.body.winOrLose11, req.body.roles11),
							player12: req.body.winOrLose12,
							player12Role: req.body.roles12,
							player12Point: calculatePoint(req.body.winOrLose12, req.body.roles12),
							player13: req.body.winOrLose13,
							player13Role: req.body.roles13,
							player13Point: calculatePoint(req.body.winOrLose13, req.body.roles13),
							player14: req.body.winOrLose14,
							player14Role: req.body.roles14,
							player14Point: calculatePoint(req.body.winOrLose14, req.body.roles14),
							player15: req.body.winOrLose15,
							player15Role: req.body.roles15,
							player15Point: calculatePoint(req.body.winOrLose15, req.body.roles15),
							player16: req.body.winOrLose16,
							player16Role: req.body.roles16,
							player16Point: calculatePoint(req.body.winOrLose16, req.body.roles16),
							player17: req.body.winOrLose17,
							player17Role: req.body.roles17,
							player17Point: calculatePoint(req.body.winOrLose17, req.body.roles17),
							player18: req.body.winOrLose18,
							player18Role: req.body.roles18,
							player18Point: calculatePoint(req.body.winOrLose18, req.body.roles18),
							player19: req.body.winOrLose19,
							player19Role: req.body.roles19,
							player19Point: calculatePoint(req.body.winOrLose19, req.body.roles19),
							player20: req.body.winOrLose20,
							player20Role: req.body.roles20,
							player20Point: calculatePoint(req.body.winOrLose20, req.body.roles20),
						}
					db('gamesData')
						.insert(newGameData)
						.then((ids) => {
							newGameData.id = ids[0];
							function ifWin(result){
								if (Number(result) > 0) {
									return 1
								} else {
									return 0
								}
							}
							function ifLose(result){
								if (Number(result) < 0) {
									return 1
								} else {
									return 0
								}
							}

							db('gamersData')
								.where('gameId', gameId)
								.where('gamerSerial', 1)
								.first()
								.then((gamer1)=> {
									db('gamesData')
										.where('gameId', gameId)
										.where('gameSerial', serialOfGame)
										.first()
										.then((currentGame)=> {
											var updatedPoint = Number(gamer1.gamePoints) + Number(currentGame.player1Point);
											var updatedWin = Number(gamer1.win) + ifWin(currentGame.player1);
											var updatedLose = Number(gamer1.lose) + ifLose(currentGame.player1);
											var totalGames = updatedWin + updatedLose;
											db('gamersData')
											.where('gameId', gameId)
											.where('gamerSerial', 1)
											.first()
											.update({
												gamePoints: updatedPoint,
												win: updatedWin,
												lose: updatedLose,
												numberGames: totalGames,
												KDA: Math.floor(updatedWin / totalGames * 100) + "%",
											}).then(()=> {
												db('gamersData')
													.where('gameId', gameId)
													.where('gamerSerial', 2)
													.first()
													.then((gamer2)=> {
														if (!gamer2) {
															res.redirect('/game' + gameId)
														} else {
															db('gamesData')
																.where('gameId', gameId)
																.where('gameSerial', serialOfGame)
																.first()
																.then((currentGame)=> {
																	var updatedPoint = Number(gamer2.gamePoints) + Number(currentGame.player2Point);
																	var updatedWin = Number(gamer2.win) + ifWin(currentGame.player2);
																	var updatedLose = Number(gamer2.lose) + ifLose(currentGame.player2);
																	var totalGames = updatedWin + updatedLose;
																	db('gamersData')
																	.where('gameId', gameId)
																	.where('gamerSerial', 2)
																	.first()
																	.update({
																		gamePoints: updatedPoint,
																		win: updatedWin,
																		lose: updatedLose,
																		numberGames: totalGames,
																		KDA: Math.floor(updatedWin / totalGames * 100) + "%",
																	}).then(()=>{
																	db('gamersData')
																		.where('gameId', gameId)
																		.where('gamerSerial', 3)
																		.first()
																		.then((gamer3)=> {
																			if (!gamer3) {
																				res.redirect('/game' + gameId)
																			} else {
																				db('gamesData')
																					.where('gameId', gameId)
																					.where('gameSerial', serialOfGame)
																					.first()
																					.then((currentGame)=> {
																						var updatedPoint = Number(gamer3.gamePoints) + Number(currentGame.player3Point);
																						var updatedWin = Number(gamer3.win) + ifWin(currentGame.player3);
																						var updatedLose = Number(gamer3.lose) + ifLose(currentGame.player3);
																						var totalGames = updatedWin + updatedLose;
																						db('gamersData')
																						.where('gameId', gameId)
																						.where('gamerSerial', 3)
																						.first()
																						.update({
																							gamePoints: updatedPoint,
																							win: updatedWin,
																							lose: updatedLose,
																							numberGames: totalGames,
																							KDA: Math.floor(updatedWin / totalGames * 100) + "%",
																						}).then(()=>{
																						db('gamersData')
																							.where('gameId', gameId)
																							.where('gamerSerial', 4)
																							.first()
																							.then((gamer4)=> {
																								if (!gamer4) {
																									res.redirect('/game' + gameId)
																								} else {
																									db('gamesData')
																										.where('gameId', gameId)
																										.where('gameSerial', serialOfGame)
																										.first()
																										.then((currentGame)=> {
																											var updatedPoint = Number(gamer4.gamePoints) + Number(currentGame.player4Point);
																											var updatedWin = Number(gamer4.win) + ifWin(currentGame.player4);
																											var updatedLose = Number(gamer4.lose) + ifLose(currentGame.player4);
																											var totalGames = updatedWin + updatedLose;
																											db('gamersData')
																											.where('gameId', gameId)
																											.where('gamerSerial', 4)
																											.first()
																											.update({
																												gamePoints: updatedPoint,
																												win: updatedWin,
																												lose: updatedLose,
																												numberGames: totalGames,
																												KDA: Math.floor(updatedWin / totalGames * 100) + "%",
																											}).then(()=>{
																												req.session.message = '添加成功'
																												res.redirect('/game' + gameId)
																											})
																										})
																								}
																							})
																						})
																					})
																			}
																		})
																	})
																})
														}
													})
											})
										})
								})
							
				})
			})
		})



module.exports = router;
