var express = require('express');
var router = express.Router();
var knex = require('knex');




router
	.get('/uploadSuccess', (req, res, next) => {
			res.render('uploadSuccess')
		})


module.exports = router;
