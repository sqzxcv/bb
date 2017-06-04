var mysql = require('mysql');
var async = require("async");
var config = require('../config');
var moment = require('moment');

module.exports = function (req, res, next, callback) {


    function randomString(len) {
        len = len || 32;
        var $chars = 'abcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    var pool = mysql.createPool({
        host: config['dbhost'],
        user: config['dbuser'],
        password: config['dbpwd'],
        database: "BB",
        connectionLimit: 100,
        port: "3306",
        waitForConnections: false
    });

    pool.getConnection(function (err, connection) {

        function genUsername(len, usernameCallback) {

            username = randomString(len);
            //查询是否存在同名 user
            connection.query("select * from user where username=?", [username], function (err, results, fields) {

                if (results.length != 0) {

                    genUsername(len++, usernameCallback);
                } else {
                    usernameCallback(username);
                }
            });
        }

        genUsername(6, function (username) {

            var expirestime = moment().add(1, 'months').unix();
            var pwd = randomString(6);
            connection.query("insert into user(username,pwd,expirestime) values(?,?,?)", [username, pwd, expirestime], function (err, results, fields) {

                connection.release();
                if (err == null) {
                    res.render("success", {
                        "title": "Welcome,VIP username and password",
                        "username": username,
                        "password": pwd,
                        "expire": moment.unix(expirestime).format('MMMM Do YYYY, h:mm:ss a')
                    });
                }
            });
        });
    });
}