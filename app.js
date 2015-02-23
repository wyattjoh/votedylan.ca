var nconf = require('nconf').argv().env();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MemcachedStore = require('connect-memcached')(session);
var csrf = require('csurf');
var helmet = require('helmet');

var routes = require('./routes/index');
var send = require('./routes/send');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add Helmet measures
app.use(helmet.xssFilter());
app.use(helmet.xframe());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(helmet.hsts({ maxAge: 123000 }));
app.use(helmet.nosniff());
app.use(helmet.ienoopen());

app.use(cookieParser(nconf.get('COOKIE_SECRET')));

var sessionSettings = {
    secret: nconf.get('SESSION_SECRET'),
    resave: true,
    saveUninitialized: true,
    proxy: true
};

// Session for dev and production env
if (app.get('env') != 'development') {
    sessionSettings.store = new MemcachedStore({
        hosts: [ nconf.get('MEMCACHIER_SERVERS') ]
    });
    sessionSettings.cookie = { secure: false };
}

app.use(session(sessionSettings));
app.use(csrf());

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/send', send);

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
