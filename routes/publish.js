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
	.get('/publish', (req, res) => {
			res.render('publish', {
					title: '发布活动'

				})
		})


module.exports = router;
