var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cardsRouter = require('./routes/cards');
var createDeckRouter = require('./routes/createDeck');
var fillDeckRouter = require('./routes/fillDeck');
var createUserRouter = require('./routes/createUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.use(logger('dev'));
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));
*/

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 5000000
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/createDeck', createDeckRouter);
app.use('/fillDeck', fillDeckRouter);
app.use('/createUser', createUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
