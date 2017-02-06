var express = require('express');
var router = express.Router();
var knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'test',
  },
  UseNullAsDefault: true
})



router
	.get('/publish', (req, res) => {
			res.render('publish', {
					title: '发布活动',
          partials: {
            header: './partials/header',
            footer: './partials/footer'
          }
				})
		})
  .post('/publish', function (req, res) {
      const newEvent = {
        title: req.body.eventName,
        type: req.body.eventType,
        date: '2017-01-01 19:00:00',
        capacity: req.body.eventCapacity,
        currentFill: 0,
        address: req.body.eventAddress,
        note: req.body.eventNote
      }
      db('events')
        .insert(newEvent)
        .then((ids) => {
          newEvent.id = ids[0];
          res.redirect('/event/'+newEvent.id);
        })

  });


module.exports = router;
