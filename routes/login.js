var mysql = require('mysql');
var async = require("async");
var config = require('../config');
var moment = require('moment');


module.exports = function (req, res, next, callback) {

    req.assert('username', "用户名不能为空").notEmpty();
    req.assert('password', "密码不能为空").notEmpty();
    var errors = req.validationErrors();
    if (errors && errors.length > 0) {
        var ermsg = [];
        for (var i = 0; i < errors.length; i++) {
            ermsg.push(errors[i].msg);
        }
        var json = { title: '爱吧-- 请先登录', error: ermsg.join("\n") };
        res.render('login', json);
        return;
    }

    var username = req.body.username;
    var pwd = req.body.password;
    // var ip = req.ip;
    // userbiz.checkUser(userid, pwd, ip, function (err, user) {
    //     if (!!err) {
    //         var json = { title: '管理后台-- 请先登录', error: err };
    //         res.render('admin/login', json);
    //     }
    //     else {
    //         req.session.user_id = user.user_id;
    //         req.session.user = user;
    //         res.redirect("/admin/index");
    //     }

    // });

    var pool = mysql.createPool({
        host: config['dbhost'],
        user: config['dbuser'],
        password: config['dbpwd'],
        database: "BB",
        connectionLimit: 10,
        port: "3306",
        waitForConnections: false
    });

    pool.getConnection(function (err, connection) {

        connection.query("select * from user where username=?", [username], function (err, results, fields) {

            if (results.length == 1 && results[0]['pwd'] == pwd) {

                req.session.user = username;
                req.session.user_id = results[0]['uid'];
                res.redirect("/");
                // res.send(200);
            } else {
                if (results.length > 1) {

                    console.error("存在多個重複的 username:" + username);
                }
                req.session.error = "用户名或密码不正确";
                res.send(404);
            }
        });
    })
};