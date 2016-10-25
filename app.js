var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//require('./app_server/models/db');
//instantiating instances of modules
var routes = require('./app_server/routes/index');
//routes folder, index.js file
var restaurants =  require('./app_server/routes/restaurants');
//routes folder, restaurants.js file
var users = require('./app_server/routes/users');
//routes folder, users.js file

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.get('/restaurants', restaurants.findAll);
app.get('/restaurants/:id', restaurants.findById);
app.get('/restaurants', restaurants.update);
app.post('/update',restaurants.confirm);
//here's the deal with :id
//when registering this route with express
//take this part of the URL and store in a variable, id
//any variable captured this way is put in the request inside the params object

//app.post('/restaurants', restaurants.updateNew);

/*app.post('/wines', restaurants.addEntry);
app.put('/restaurants/:id', restaurants.updateById);
app.delete('/restaurants/:id', restaurants.deleteById);*/
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
