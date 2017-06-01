var index = require('./index');
var users = require('./users');
var videoPreview = require('./videoPreview');
var login = require('./login');
var successPay = require('./success');

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
        if (req.url == "/") {
            index(0, req, res, next, function (err) { });
        } else {
            next();
        }
    });
    app.get('/:id(\d+)', function (req, res, next) {
        //res.render('index', { title: '首页' });
        // next();
        var pageIndex = parseInt(req.params.id, 10);;
        if (pageIndex >= 0) {
            index(pageIndex, req, res, next, function (err) { });
        } else {
            next();
        }
    });

    app.get('/detail/:id', function (req, res, next) {

        var videoIndex = parseInt(req.params.id, 10);

        videoPreview(videoIndex, req, res, next, function (err) { });
    });

    app.get('/login', function (req, res, next) {

        res.render('login', {
            "loginURL": "/login/"
        });
    });
    app.post('/login/', function (req, res, next) {

        login(req, res, next, function (err) {

        });
    });
    app.get('/logout',function (req, res, next) {

        //清除session，cookie
		req.session.destroy(function(){
			res.clearCookie("user",{});
			res.cookie("isLogin","false");
			res.redirect("/");
		});
    });
    app.get('/islogin',function (req, res, next){

        if (req.session.isLogin == true) {

            res.send({status:200});
        } else {
            res.send();
        }
    });
    app.get('/success/SFDsdfsdsddf34df5DS53FsdD898GDF0dfd123243', function (req, res, next) {

        successPay(req, res, next, function (err) {

        });
    });
};