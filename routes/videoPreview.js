var mysql = require('mysql');
var async = require("async");
var config = require('../config');
var inviteLink = require('../common/common').inviteLink;
var initHeader = require("../common/initHeader").initHeader;

module.exports = function (index, contentType, req, res, next, callback) {

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
                var title = "",
                    video_info = "<a class='copy' href='{{check_video_add}}'>{{title}}</a>";
                if (contentType == "hq_content") {
                    title += "(高清)";
                    video_info = video_info.replace(/{{check_video_add}}/g, "/detail/" + index)
                        .replace(/{{title}}/, "切换:标准清晰度");
                } else {
                    video_info = video_info.replace(/{{check_video_add}}/g, "/hq/" + index)
                        .replace(/{{title}}/, "切换:高清视频");
                }
                title += results[0]['title'];
                var rootUrl = "http://99kk3.com";
                var videoNeedPaused = "", iLink = "",showInvitView="none";
                if (!req.session.user_id) {
                    videoNeedPaused ="<script type='text/javascript'>var videoNode = document.getElementById('my-player'); var pausing_function = function () {if (this.currentTime >= 15 * 60 && this.paused==false) {this.pause();var r = confirm('请登录后继续观看');if (r == true) {window.location.href='http://love8video.com/login';}}}; videoNode.addEventListener('timeupdate', pausing_function);</script>"; //"<script type='text/javascript' src='../javascript/playvideo.js'></script>";
                    iLink = inviteLink(req, res);
                    showInvitView ="block";
                }

                res.render('item', {
                    "title": title,
                    "_XXXXXRESOURCE_ADDRESS_": rootUrl + results[0][contentType],
                    '_XXXPREVIEW_ADDR_': "http://" + results[0]['preview_url'],
                    'XXXWIDTH_': results[0]['width'],
                    'XXXHEIGHT_': results[0]['height'],
                    "FrameXXXHEIGHT_": results[0]['height'] + 10,
                    "tdappid": config["tdappid"],
                    "appversion": config["appversion"],
                    "header": initHeader(req),
                    "alert": script,
                    "showInvitView": showInvitView,
                    "invitLink": iLink,
                    "video_info": video_info,
                    "videoNeedPaused":videoNeedPaused
                });
            } else {
                next();
            }
            callback(err);
        });
    });
};