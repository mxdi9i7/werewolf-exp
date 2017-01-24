var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var index = require('./routes/index');
var users = require('./routes/users');
var event = require('./routes/event');
var publish = require('./routes/publish');
var app = express();
var knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'test',
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "egiang", resave: false, saveUninitialized: false}))
// app.use('/', index);
// app.use('/users', users);
app
	.use(index)
	.use(event)
	.use(publish)
	.get('/users', (req, res, next) => {
		db('users').then((users) => {
			res.send(users);
		}, next)
	})
	.get('/set', (req, res, next) => {
		req.session.name = "peter";
		res.send(req.session);
	})
	.post('/users', (req, res, next) => {

		db('users')
		.insert(req.body)
		.then((userIds) => {
			res.send(userIds);
		}, next)
	})
	.put('/users/:id', (req, res, next) => {
		const { id } = req.params;

		db('users')
		.where('id', id)
		.update(req.body)
		.then((result) => {
			if (result === 0) {
				return res.send(404)
			}
			res.send(200);
		}, next)
	})
	.delete('/users/:id', (req, res, next) => {
		const { id } = req.params;

		db('users')
		.where('id', id)
		.delete(req.body)
		.then((result) => {
			if (result === 0) {
				return res.send(404)
			}
			res.send(200);
		}, next)
	})
	.get('/users/:id', (req, res, next) => {
		const { id } = req.params;
		db("users")
		.where("id", id)
		.first()
		.then((users) => {
			if (users == "") {
				res.send('user not found')
			} else {
				res.send(users)
			}
		}, next)
	})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
