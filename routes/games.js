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
	.get('/games:gameId', loginRequired, (req, res, next) => {
		const { gameId } = req.params;
		res.render('games',{
			partials: {
				header: './partials/header',
				footer: './partials/footer'
			},
			nickname: req.user.nickname,
			authenticated: req.isAuthenticated(),
			currentUser: req.user.nickname,
			profilePic: req.user.profilePic			

		})
	})
	.post('/games', loginRequired, upload.single('gameFile'), (req,res,next) => {
		var newGame = {
			title: req.body.title,
			host: req.user.id,
			totalGames: 0,
			totalPlayers: 0,
			totalPoints: 0,
			clickCount: 10,
			description: req.body.description,
			// filePath: req.file.filename ? req.file.filename : 'images/shortshortwolf.jpg'
		}
		console.log(req.file)
		db('games')
			.insert(newGame)
			.then((ids)=>{
				newGame.id = ids[0]
				res.redirect('/games')
			})
	})





module.exports = router;
