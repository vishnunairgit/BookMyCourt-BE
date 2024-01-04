var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require ('./config/db');
const cors = require('cors');
var app = express();

// const adminRouter =require('./routes/adminRouter')

// require('dotenv').config

const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error
}
// console.log(process.env.JWT_PASSWORD ,"jwt password");
app.use(cors({ 
  origin:['https://bookmycourt-app-4yrm.onrender.com','http://localhost:3000']
 }))


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter =require('./routes/authRouter');
const adminRouter =require('./routes/adminRouter');
const paymentRouts =require('./routes/paymentRouts');




// const { connect } = require('http2');
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// cors error resolving


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/payment', paymentRouts);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in developmentp
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
