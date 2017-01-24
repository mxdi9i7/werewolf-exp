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
/* GET home page. */
router
	.get('/', (req, res, next) => {
		db('events').then((events) => {
			res.render('index', {
				title: '面杀网',
				events,
			})

			
		})
	})



module.exports = router;
