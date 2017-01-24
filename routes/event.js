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



router
	.get('/event/:event_id', (req, res, next) => {
		const { event_id } = req.params;
		db("events")
		.where("id", event_id)
		.first()
		.then((event) => {
			res.render('event', {
					title: '活动详情',
					event,
				})
		}, next)
	})


module.exports = router;
