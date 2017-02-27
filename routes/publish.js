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
          profilePic: req.user.profilePic,
          authenticated: req.isAuthenticated()
				})
		})
  .post('/publish', loginRequired, function (req, res) {
    var fileName = 'images/' + req.session.filePath;
    var time = req.body.eventYear + "年" + req.body.eventMonth + "月" + req.body.eventDay + "日" + " " + req.body.eventHour + " 点";
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
        filePath: fileName,
        host_profile: req.user.profilePic,
        admission: req.body.eventAdmission
      }
      db('events')
        .insert(newEvent)
        .then((ids) => {
          newEvent.id = ids[0];
          db('users')
          .where('id', req.user.id)
          .first()
          .then((user)=> {
            var parsedRSVP = ',' + newEvent.id + "/" + newEvent.title;
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
