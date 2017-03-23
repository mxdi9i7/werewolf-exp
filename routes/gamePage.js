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
			})
		})
	})
	.post('/addGamer', loginRequired, (req, res, next)=> {
		var currentGame = req.body.gameId;
		
		db('gamersData')
		.where('gameId', currentGame)
		.then((gamers)=> {
			var gamerSerial = gamers.length + 1
			var newGamer = {
				userId: req.body.gamerId,
				gameId: currentGame,
				gamePoints: 0,
				gamerSerial: gamerSerial
			}
			db('gamersData')
			.insert(newGamer)
			.then((ids) => {
	          newGamer.id = ids[0];
	        }).then(()=> {
	        	res.redirect('/game' + currentGame)
	        })
		})
		
	})





module.exports = router;
