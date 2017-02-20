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
	.get('/publish', loginRequired,(req, res, next) => {
			res.render('publish', {
					title: '发布活动',
          partials: {
            header: './partials/header',
            footer: './partials/footer'
          },
          host: req.user.nickname,
          authenticated: req.isAuthenticated()
				})
		})
  .post('/publish', loginRequired, function (req, res) {
    var time = req.body.eventTime;
    var fileName = 'images/' + req.session.filePath;
    var date = new Date(time);
          Y = date.getFullYear() + '-';
          M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          D = date.getDate() + ' ';
          h = date.getHours() + ':';
          m = date.getMinutes() + ':';
          s = date.getSeconds();
    var format = Y+M+D+h+m+s;
    console.log(format); 
      const newEvent = {
        title: req.body.eventName,
        type: req.body.eventType,
        date: format,
        capacity: req.body.eventCapacity,
        address: req.body.eventAddress,
        note: req.body.eventNote,
        user_id: req.user.id,
        user_nickname: req.user.nickname,
        participants: req.user.nickname,
        currentFill: 1,
        participantsID: req.user.id,
        filePath: fileName
      }
      db('events')
        .insert(newEvent)
        .then((ids) => {
          newEvent.id = ids[0];
          res.redirect('/event'+newEvent.id);
        })
  })


module.exports = router;
