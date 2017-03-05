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

var counter = 1;

router
	.get('/event:event_id', loginRequired, (req, res, next) => {
			const { event_id } = req.params;
			counter += 18;
				db('events')
				.where('id', event_id)
				.first()
				.update({
					clickCount: counter
				})
				.then(()=> {
					db("events")
					.where("id", event_id)
					.first()
					.then((event) => {
						res.render('event', {
								event,
								title: event.title,
								partials: {
									header: './partials/header',
									footer: './partials/footer'
								},
								currentFill: function() {
									return event.participants.split(',').length;
								},
								authenticated: req.isAuthenticated(),
								joined: function() {
									if (event.participantsID.indexOf(req.user.id) > -1) {
										return 'joined'	
									}
								},
								currentUser: req.user.nickname,
								profilePic: req.user.profilePic,
								owned: function() {
									if (event.user_id !== req.user.id) {
										return 'notOwned';
									}
								}
							})
						console.log(event.filePath)
					}, next)
				})
	})
	.post('/event:event_id', loginRequired, (req, res, next) => {
		const { event_id } = req.params;
		db('events')
			.where('id', event_id)
			.first()
			.then((event) => {
				var parsedString = ',' + req.user.nickname;
				var updatedString = event.participants + parsedString;
				console.log(updatedString)
				var currentFillNumber = updatedString.split(',').length;

				var parsedID = ',' + req.user.id;
				var updatedID = event.participantsID + parsedID;
				db('events')
					.where('id', event_id)
					.first()
					.update({
					    participants: updatedString,
					    currentFill: currentFillNumber,
					    participantsID: updatedID
					})
					.then((event) => {
						db('users')
						.where('id', req.user.id)
						.first()
						.then((user)=> {
							var parsedRSVP = ',' + event_id + "/" + event.title;
							var updatedRSVP = user.rsvp + parsedRSVP;
							db('users')
							.where('id', req.user.id)
							.first()
							.update({
								rsvp: updatedRSVP
							})
							.then(()=> {
								res.redirect('event'+event_id)
							})
						})
					})
			})
			
	})
	.get('/delete:event_id', loginRequired, (req, res, next) => {
		const { event_id } = req.params;
		db('events')
			.where('id', event_id)
			.first()
			.then((event)=>{
				if (req.user.id !== event.user_id) {
					res.render('notAuthorized')
				}
				db('events')
				.where('id', event_id)
				.first()
				.update({
					is_available: 0
				})
				.then((event) => {
					res.redirect('/event' + event_id)
				})
				// .delete()
				// .then((result) => {
				// if (result === 0) {
				// 	return res.send(404)
				// 	}
				// 	res.redirect('/');
				// }, next)
			})
		})
	.get('/update:event_id', loginRequired, (req, res, next) => {
		const { event_id } = req.params;
		db('events')
			.where('id', event_id)
			.first()
			.then((event)=> {
				if (req.user.id !== event.user_id) {
					res.render('notAuthorized')
				}
				res.render('updateEvent', {
					event,							
					authenticated: req.isAuthenticated(),
					partials: {
						header: './partials/header',
						footer: './partials/footer'
					}
				})
			})
	})
	.post('/update:event_id', loginRequired, (req, res, next) => {
		const { event_id } = req.params;
		console.log(req.params);
		// var time = req.body.eventYear + "年" + req.body.eventMonth + "月" + req.body.eventDay + "日" + " " + req.body.eventHour + ":" + req.body.eventMinute;
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
	        admission: req.body.eventAdmission,
	      }
		db('events')
			.where('id', event_id)
			.first()
			.update(newEvent)
			.then((event)=> {
				res.redirect('/event' + event_id)
			})
	})


module.exports = router