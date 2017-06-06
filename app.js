var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var routes = require("./routes/routes");


var app = express();


// app.get('/:id', function(req, res, next) {


// });
// var video = require('./routes/videoPreview');
// app.use('/:id',video);
// view engine setup
app.set('views', path.join(__dirname, 'view_xtpl'));
//留意模板引擎使用xtpl，而不是jade
app.set('view engine', 'xtpl');
// app.set('view engine', 'ejs');

var xtpl = require('xtpl');
//开启express适配
xtpl.__express = xtpl.renderFile;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
//var redisClient = redis.createClient(6379, '127.0.0.1', {auth_pass: 'password'});
app.use(session({
  secret: "weird sheepdfdfdf",
  resave: false,
  saveUninitialized: true,
  // store: new redisStore({client:redisClient}),
  cookie: {user:"default",maxAge: 1*24*60*60*1000}
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/categories",express.static(path.join(__dirname, 'public')));
routes(app);


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
