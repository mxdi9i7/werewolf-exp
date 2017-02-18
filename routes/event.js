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
	.get('/event:event_id', loginRequired, (req, res, next) => {
			const { event_id } = req.params;
				db("events")
				.where("id", event_id)
				.first()
				.then((event) => {
					res.render('event', {
							title: '活动详情',
							event,
							partials: {
								header: './partials/header',
								footer: './partials/footer'
							},
							currentFill: function() {
								return event.participants.split(',').length;
							},
							authenticated: req.isAuthenticated(),
							joined: function() {
								if (event.participantsID.indexOf(req.user.id) > 0) {
									return 'joined'	
								}
							},
							currentUser: req.user.nickname
						})
				}, next)
	})
	.post('/event:event_id', loginRequired, (req, res, next) => {
		const { event_id } = req.params;
		db('events')
			.where('id', event_id)
			.first()
			.then((event) => {
				var parsedString = ',' + req.user.nickname;
				var updatedString = event.participants + parsedString;

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
					.then(()=>{
						db('users')
						.where('id', req.user.id)
						.first()
						.then((user) => {
							var parsedRSVP = ',' + req.body.joiner; 
							var updatedRSVP = user.rsvp + parsedRSVP; 
							db('users')
								.where('id', req.user.id)
								.first()
								.update({rsvp: updatedRSVP})
								.then((user)=>{
									res.redirect('/event' + event_id)
								})
						})
						
						
					})
			})
			
	})
	// .post('/eventDelete', loginRequired, (req, res, next) => {
	// 	const { event_id } = req.params;
	// 	db('events')
	// 		.where('user_id', req.user.id)
	// 		.first()
	// 		.delete()
	// 		.then((result) => {
	// 		if (result === 0) {
	// 			return res.send(404)
	// 		}
	// 		res.send(200);
	// 	}, next)
	// })


module.exports = router;
