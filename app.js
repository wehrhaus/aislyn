var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    routes = require('./routes/router'),
    stylus = require('stylus'),
    nib = require('nib'),
    app = express(),
    env = app.get('env');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if (env === 'development') {
    app.use(function (req, res, next) {
        app.locals.pretty = true;
        next();
    });
    var livereload = require('express-livereload'),
        config = {
            watchDir: path.join(__dirname, '../aislyn')
        };
    livereload(app, config);
}

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .set('compress', false)
        .use(nib());
}

app.use(stylus.middleware({
    src: path.join(__dirname, 'public'),
    compile: compile
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/results', routes);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (env === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
