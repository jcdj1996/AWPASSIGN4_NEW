var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon'),
  session = require('express-session');

// additions for authentication
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

/*Local DB Setup
var DB = require('./server/config/db.js');
mongoose.connect(DB.url);
mongoose.connection.on('error', function () {
  console.error('MongoDB Connection Error');
});// live */

//connect to mongoLab account
mongoose.connect('mongodb://afield:joey77@ds037814.mongolab.com:37814/heroku_gftj0f7r');

// check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Error: '));
db.once('open', function(callback) {
  console.log('Connected to mongodb');
});

//Routes Setup
var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var survey = require('./server/routes/survey');

var flash = require('connect-flash');

var app = express();
//app.use(favicon(__dirname+'./public/favicon.ico'));

// passport configuration
require('./server/config/passport')(passport);


// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'someSecret',
  saveUninitialized: true,
  resave: true 
}));

app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//route usage
app.use('/', routes);
app.use('/users', users);
app.use('/survey', survey);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//implemented mongoLab db