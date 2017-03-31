var express = require('express');
var router = express.Router();
var knex = require('knex');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
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

/* GET home page. */
router
	.get('/games', loginRequired, (req, res, next) => {
		db('games')
		.then((games) => {
			res.render('games',{
				partials: {
					header: './partials/header',
					footer: './partials/footer'
				},
				nickname: req.user.nickname,
				authenticated: req.isAuthenticated(),
				currentUser: req.user.nickname,
				profilePic: req.user.profilePic,
				games,
			})
		})
	})
	.post('/games', loginRequired, upload.single('eventFile'), (req,res,next) => {
		var imageUploaded = req.file
		

		console.log(req.session.filePath)
		db('games')
			.then((games)=> {
				var gameId = games.length + 1;
				var newGamer = {
					userId: req.user.id,
					gameId: gameId,
					gamePoints: 0,
					gamerSerial: 1,
					gamerNickname: req.user.nickname,
					gamerProfile: req.user.profilePic,
					gamerGender: req.user.gender,
					numberGames: 0,
					KDA: 0,
					rank: 0,
					rankPic: 'images/ranks/level0.png'
				}
				var newGame = {
					id: games.length + 1,
					title: req.body.title,
					host: req.user.id,
					totalGames: 0,
					totalPlayers: 0,
					totalPoints: 0,
					clickCount: 10,
					createdAt: Date.now(),
					description: req.body.description,
					filePath: req.session.filePath ? req.session.filePath : 'shortshortwolf.jpg'
				}
				db('games')
				.insert(newGame)
				.then((ids)=>{
					newGame.id = ids[0]
					db('gamersData')
					.insert(newGamer)
					.then((ids)=> {
						newGamer.id = ids[0]
						res.redirect('/games')
					})
				})
			})
			
	})





module.exports = router;
