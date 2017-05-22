var index = require('./index');
var users = require('./users');
var videoPreview = require('./videoPreview');
var login = require('./login');

var mysql = require('mysql');
var async = require("async");


module.exports = function (app) {

    // app.use('/:id', videoPreview);
    // app.use('/', index);
    // app.use('/users', users);

    /* GET home page. */
    app.get('/', function (req, res, next) {
        //res.render('index', { title: '首页' });
        // next();
        index(0, req, res, next, function (err) { });
    });
    app.get('/:id', function (req, res, next) {
        //res.render('index', { title: '首页' });
        // next();
        var pageIndex = parseInt(req.params.id, 10);;
        index(pageIndex, req, res, next, function (err) { });
    });

    app.get('/detail/:id', function (req, res, next) {

        var videoIndex = parseInt(req.params.id, 10);

        videoPreview(videoIndex, req, res, next, function (err) { });
    });

    app.get('/login/', function(req, res,next) {

        login(req, res,next);
    });
};