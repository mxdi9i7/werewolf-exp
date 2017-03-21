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


router
	.get('/publish', loginRequired,(req, res, next) => {
			res.render('publish', {
					title: '发布活动',
          partials: {
            header: './partials/header',
            footer: './partials/footer'
          },
          host: req.user.nickname,
          profilePic: req.user.profilePic,
          authenticated: req.isAuthenticated()
				})
		})
  .post('/publish', loginRequired, function (req, res) {
    var fileName = 'images/' + req.session.filePath;
    var defaultFileName = 'images/tournamentbg3.png'
    var weekday = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = weekday[new Date(req.body.eventDate).getDay()];
    var time = req.body.eventDate + " " + week + " " + req.body.eventHour;
      const newEvent = {
        title: req.body.eventName,
        type: req.body.eventType,
        date: time,
        capacity: req.body.eventCapacity,
        address: req.body.eventAddress,
        note: req.body.eventNote,
        user_id: req.user.id,
        user_nickname: req.user.nickname,
        participants: req.user.nickname,
        currentFill: 1,
        participantsID: req.user.id,
        filePath: req.session.filePath ? filename : defaultFileName,
        host_profile: req.user.profilePic,
        admission: req.body.eventAdmission ? req.body.eventAdmission : '免费', 
      }
      db('events')
        .insert(newEvent)
        .then((ids) => {
          newEvent.id = ids[0];
          db('users')
          .where('id', req.user.id)
          .first()
          .then((user)=> {
            db('events')
            var parsedRSVP = ',' + newEvent.id;
            var updatedRSVP = user.rsvp + parsedRSVP;
            db('users')
            .where('id', req.user.id)
            .first()
            .update({
              rsvp: updatedRSVP
            })
            .then(() => {
                res.redirect('/event'+newEvent.id);
            })
          })
        })

  })


module.exports = router;
