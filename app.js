const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');
require("babel-core/register");
const MongoStore = require('connect-mongo')(session);
const config = require('./config');

const index = require('./routes/index');
const user = require('./routes/user');
const role = require('./routes/role');
const user_role = require('./routes/user_role');
const product = require('./routes/product');
const order = require('./routes/order');
const auth =  require('./routes/auth');

const app = express();


// mongoose config
const mongoose = require('mongoose');
mongoose.promise = global.promise;
mongoose.connect(config.mongodb);  
mongoose.connection.on ('error', () => {
    console.log('连接数据库失败')
});
mongoose.connection.once ('open', function () {
    console.log('连接数据库成功!')
});

// view engine setup
app.set('views', path.join(__dirname, 'FE'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'FE')));

//配置session
app.use(session({
  secret: config.session.secret,
  name: config.session.key,   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: config.session.maxAge },  //设置maxAge是180 day
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use('/',index);
app.use('/api', auth);
app.use('/api/user', user);
app.use('/api/role',role);
app.use('/api/user_role',user_role);
app.use('/api/product',product);
app.use('/api/order',order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      status:0
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({status:0,message:err.message});
});



module.exports = app;
