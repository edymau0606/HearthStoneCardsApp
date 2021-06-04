var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var cardRouter = require('./routes/card');
var createDeckRouter = require('./routes/createDeck');
var fillDeckRouter = require('./routes/fillDeck');
var createUserRouter = require('./routes/createUser');
var getUsersRouter = require('./routes/getUsers');
var getRolesRouter = require('./routes/getRoles');
var deckRouter = require('./routes/deck');
var getDecksRouter = require('./routes/getDecks');
var deckRouter = require('./routes/deck');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

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
app.use('/user', userRouter);
app.use('/card', cardRouter);
app.use('/createDeck', createDeckRouter);
app.use('/fillDeck', fillDeckRouter);
app.use('/createUser', createUserRouter);
app.use('/getUsers', getUsersRouter);
app.use('/getRoles', getRolesRouter);
app.use('/deck', deckRouter);
app.use('/getDecks', getDecksRouter);
app.use('/deck', deckRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

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
