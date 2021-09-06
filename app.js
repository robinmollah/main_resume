let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
const fileUpload = require('express-fileupload');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let urlRouter = require('./src/url-shortener/router');
let hostingRouter = require('./src/hosting/router');

let app = express();
app.enable('trust proxy');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB
  },
  abortOnLimit: true
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/hosting', hostingRouter);
app.use('/api/url', urlRouter);

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
