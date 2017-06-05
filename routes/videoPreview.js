var mysql = require('mysql');
var async = require("async");
var config = require('../config');
var initHeader = require("../common/initHeader").initHeader;

module.exports = function (index, req, res, next, callback) {

    var pool = mysql.createPool({
        host: config['dbhost'],
        user: config['dbuser'],
        password: config['dbpwd'],
        database: "BB",
        connectionLimit: 100,
        port: "3306",
        waitForConnections: false
    });

    // var self = this;
    pool.getConnection(function (err, connection) {

        connection.query("select * from videos where video_index=?", [index], function (err, results, fields) {

            connection.release();
            if (results.length != 0) {

                var script = "";
                // if (!req.session.user_id && results[0]["videoid"] > 2500) {
                //     script = "<script>alert('请登陆后观看.如果没有账号,请添加微信 ruchujian88或者发送邮件到 love8video@gmail.com 领取 VIP 账号.Please log in. If there is no account, please add wechat ruchujian88 or send an email to love8video@gmail.com to receive VIP account.')</script><script>document.location='/login'</script>";
                // }
                var rootUrl = "http://www.99vv1.com/";
                res.render('item', {
                    "title": results[0]['title'],
                    "_XXXXXRESOURCE_ADDRESS_": rootUrl + results[0]['lq_content'],
                    '_XXXPREVIEW_ADDR_': "http://" + results[0]['preview_url'],
                    'XXXWIDTH_': results[0]['width'],
                    'XXXHEIGHT_': results[0]['height'],
                    "FrameXXXHEIGHT_": results[0]['height'] + 100,
                    "tdappid": config["tdappid"],
                    "appversion": config["appversion"],
                    "header": initHeader(req),
                    "alert":script
                });
            } else {
                next();
            }
            callback(err);
        });
    });
};