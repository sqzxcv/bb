var index = require('./index');
var users = require('./users');
var videoPreview = require('./videoPreview');
var login = require('./login');
var successPay = require('./success');
var middle = require("./middle");

var mysql = require('mysql');
var async = require("async");
var initHeader = require("../common/initHeader").initHeader;
var config = require('../config');
var path = require('path');


module.exports = function (app) {

    /* GET home page. */
    app.get('/', function (req, res, next) {
        //res.render('index', { title: '首页' });
        // next();
        if (req.url == "/") {
            index(0, "", req, res, next, function (err) { });
        } else {
            next();
        }
    });
    // app.get('/categories/resource/*',function (req, res, next) {

    //     var redirectURL = req.url.toString().replace(/\/categories\/resource\//,"/resource/");
    //     req.location(redirectURL);
    // });
    app.get('/categories/*', function (req, res, next) {

        var arr = (req.url.toString()).split('/');
        if (arr.length >= 3) {

            var tagname = decodeURI(arr[2]);
            var needCatch = false;
            var pageIndex = 0;
            if (tagname.length != 0) {

                if (arr.length >= 4) {
                    //有页码
                    pageIndex = parseInt(arr[3]);
                    if (false == isNaN(pageIndex)) {
                        needCatch = true;
                    }
                    if (arr[3].length==0) {
                        needCatch = true;
                        pageIndex = 0;
                    }
                } else {
                    //无页码,默认为0
                    needCatch = true;
                }
            }
            if (needCatch) {
                index(pageIndex, tagname, req, res, next, function (err) { });
            } else {
                next();
            }
        }
    });
    app.get('/categories', function (req, res, next) {

        var headerContent = initHeader(req).replace(/{{categories}}/, "active");
        res.render('categories', {
            "title": "• 爱吧 • 影片分类",
            "tdappid": config["tdappid"],
            "appversion": config["appversion"],
            "header": headerContent
        });
    });
    app.get('/latest-updates', function (req, res, next) {

        var arr = (req.url.toString()).split('/');
        var tagname = decodeURI(arr[1]);
        if (arr.length == 2) {
            // goto categories
            index(0, tagname, req, res, next, function (err) { });
        } else {
            var pageIndex = arr.length == 3 ? parseInt(arr[2]) : 0;
            index(pageIndex, tagname, req, res, next, function (err) { });
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
    app.get('/logout', function (req, res, next) {

        //清除session，cookie
        req.session.destroy(function () {
            res.clearCookie("user", {});
            res.cookie("isLogin", "false");
            res.redirect("/");
        });
    });
    app.get('/islogin', function (req, res, next) {

        if (req.session.isLogin == true) {

            res.send({ status: 200 });
        } else {
            res.send();
        }
    });
    app.get('/middle', function (req, res, next) {

        res.render("middle");
        //middle(req, res, next, function (err) {

        //});
    });
    app.get('/success/SFDsdfsdsddf34df5DS53FsdD898GDF0dfd123243', function (req, res, next) {

        successPay(req, res, next, function (err) {

        });
    });
    app.get('/:id', function (req, res, next) {
        //res.render('index', { title: '首页' });
        // next();
        var pageIndex = parseInt(req.params.id, 10);;
        if (pageIndex >= 0) {
            index(pageIndex, "", req, res, next, function (err) { });
        } else {
            next();
        }
    });
};