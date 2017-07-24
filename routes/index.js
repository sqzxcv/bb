var mysql = require('mysql');
var async = require("async");
var fs = require("fs");
var path = require("path");
var config = require('../config');
var initHeader = require("../common/initHeader").initHeader;
var inviteLink = require('../common/common').inviteLink;
var moment = require('moment');
var rootUrl = "http://www.99kk6.com/";

/*

*/
module.exports = function (index, tagname, req, res, next, callback) {


    var itemModel = fs.readFileSync(path.resolve(__dirname, "../resource/HomeItemModel")).toString();
    var adModel = fs.readFileSync(path.resolve(__dirname, "../resource/home_aditem")).toString();
    var pool = mysql.createPool({
        host: config['dbhost'],
        user: config['dbuser'],
        password: config['dbpwd'],
        database: "BB",
        connectionLimit: 100,
        port: "3306",
        waitForConnections: false
    });
    var activeTab = "home";
    var tagLocalName = ""
    var tabtitle = `最新上传`;
    switch (tagname) {
        case "": activeTab = "home"; tagname = "精品视频";tagLocalName = "精品推荐";tabtitle = `只有精品`;
            break;
        case "latest-updates": activeTab = "all"; tagLocalName = "所有视频";
            break;
        case "最新视频": activeTab = "new"; tagLocalName = tagname;
            break;
        case "categories": activeTab = "categories"; tagLocalName = "视频分类";
            break;
        case "viplatest-updates": activeTab = "vip_page"; tagLocalName = "VIP专区";
            break;
        case "高清": activeTab = "hd_video"; tagLocalName = "高清视频";
            break;
        case "日本无码": activeTab = "wuma"; tagLocalName = "日本无码";
            break;
        case "中文字幕": activeTab = "china_word"; tagLocalName = tagname;
            break;
        case "国产自拍": activeTab = "zipai"; tagLocalName = tagname;
            break;
        default:
            activeTab = "";
    }

    // var self = this;
    var videoCountPage = 30;
    pool.getConnection(function (err, connection) {

        if (err || connection == undefined) {

            console.error("链接数据库失败:" + err.message);
            next();
            return;
        }
        var sqlstr = "";
        var sqlPageCountStr = "";

        if (tagname == "最新视频" || tagname == "latest-updates") tagname = "";
        if (tagname.length != 0) {
            sqlPageCountStr = "select count(*) as count from videos where videoid in (select videoid from tagmap where tagname='" + tagname + "')";
            sqlstr = "select * from videos where videoid in (select videoid from tagmap where tagname='" + tagname + "') order by upload_time desc, videoid desc limit " + videoCountPage * index + ", " + videoCountPage + ";"
        } else {
            sqlPageCountStr = "select count(*) as count from videos";

            if (true) {
                // if (req.session.user_id) {
                sqlstr = "select * from videos order by upload_time desc, videoid desc limit " + videoCountPage * index + ", " + videoCountPage + ";";
            } else {
                sqlstr = "select * from videos order by videoid ASC limit " + videoCountPage * index + ", " + videoCountPage + ";";
            }
        }
        // 初始化页码
        connection.query(sqlPageCountStr, function (err, results, fields) {

            var pageIndexs = "";
            if (!err) {

                var video_count = results[0].count;
                var page_count = (video_count % videoCountPage) == 0 ? parseInt(video_count / videoCountPage) : parseInt(video_count / videoCountPage) + 1
                pageIndexs = initPageIndex(index, tagname, page_count);
            } else {
                console.error(err.message);
                if (index == 0) {
                    pageIndexs = "<a href=\"/" + encodeTagName + 0 + "\" class=\"btn\" title=\"Page 02\">上一页</a>";

                } else {
                    pageIndexs = "<a href=\"/" + encodeTagName + (index - 1) + "\" class=\"btn\" title=\"Page 02\">上一页</a>";
                }
                pageIndexs += "";
                pageIndexs += "<span class='btn active'>" + (index + 1) + "</span>";
                pageIndexs += "";
                pageIndexs += "<a href=\"/" + encodeTagName + (index + 1) + "\" class=\"btn\" title=\"Page 02\">下一页</a>";

            }

            //初始化视频内容
            connection.query(sqlstr, function (err, results, fields) {

                connection.release();
                var headerContent = initHeader(req);
                headerContent = headerContent.replace(eval("/{{" + activeTab + "}}/"), "active");
                if (results.length != 0) {

                    var item;
                    if (itemModel != null) {

                        var node, rate;
                        for (var i = 0; i < results.length; i++) {
                            if (results[i]['v_like'] + results[i]['v_unlike'] != 0) {

                                rate = results[i]['v_like'] / (results[i]['v_like'] + results[i]['v_unlike']);
                                rate = Number(rate).toFixed(2);
                            } else {

                                rate = 0;
                            }
                            var upload_time = "8 小时前"
                            if (results[i]['upload_time'] != 0) {
                                upload_time = moment.unix(results[i]['upload_time']).format('YYYY-M-D');
                            }
                            item = itemModel.replace(/{{detail}}/g, "/detail/" + results[i]['video_index'])
                                .replace(/{{thumbnail}}/g, rootUrl + results[i]['thumbnail'])
                                //.replace(/{{thumbnail}}/g,"./Oshine_files/preview3-650x385.jpg")
                                .replace(/{{title}}/g, results[i]['title'])
                                .replace(/{{view_count}}/g, results[i]['view_count'])
                                .replace(/{{rate}}/g, Number(rate * 100).toString() + "%")
                                .replace(/{{duration}}/g, Number((results[i]['duration'] / 1000) / 60).toFixed(0).toString() + ":" + Number((results[i]['duration'] / 1000) % 60).toString())
                                .replace(/{{thumbnails}}/g, rootUrl + path.dirname(results[i]['thumbnail']) + "/")
                                .replace(/{{upload_time}}/g,upload_time);

                            if (i == 0) {
                                node = item;
                            } else {
                                node += "\n" + item;
                            }
                        }

                        var script = "";
                        if (!req.session.user_id && tagLocalName == "最新视频") {
                            script = "<script>alert('请登陆后观看.如果没有账号,请添加微信 ai8video或者发送邮件到 love8video@gmail.com 领取 VIP 账号.Please log in. If there is no account, please add wechat ai8video or send an email to love8video@gmail.com to receive VIP account.')</script><script>document.location='/login'</script>";
                        }

                        res.render('index', {
                            "VIDEOITEM": node,
                            "title": "love8 • 爱吧视频 " + tagLocalName,
                            "video_count": "展示" + results.length + "个视频",
                            "pageIndexs": pageIndexs,
                            "tdappid": config["tdappid"],
                            "appversion": config["appversion"],
                            "header": headerContent,
                            "alert": script,
                            "showInvitView": "block",
                            "invitLink": inviteLink(req, res),
                            "tabtitle":tabtitle
                        });
                    } else {
                        next();
                    }
                } else {
                    // next();
                    res.render('index', {
                        "VIDEOITEM": "",
                        "title": "love8 • 爱吧视频 " + tagLocalName,
                        "video_count": "没有更多",
                        "pageIndexs": pageIndexs,
                        "tdappid": config["tdappid"],
                        "appversion": config["appversion"],
                        "header": headerContent,
                        "tabtitle":tabtitle
                    });
                }
                callback(err);
            });
        });
    });
};

function initPageIndex(currentIndex, tagname, page_count) {

    var pageIndexs = "";
    var encodeTagName = ""
    if (tagname.length != 0) {
        encodeTagName = "categories/" + encodeURI(tagname) + "/";
    }

    if (page_count <= 9) {

        for (var i = 0; i < page_count; i++) {

            if (i == currentIndex) {

                pageIndexs += "<span class='btn active'>" + (i + 1) + "</span>";
            } else {
                pageIndexs += "<a href=\"/" + encodeTagName + i + "\" class=\"btn\" title=\"Page " + (i + 1) + "\">" + (i + 1) + "</a>";

            }
            pageIndexs += "";

        }
    } else {

        if (currentIndex < 4) {
            for (var i = 0; i < 9; i++) {

                if (i == currentIndex) {

                    pageIndexs += "<span class='btn active'>" + (i + 1) + "</span>";
                } else {
                    pageIndexs += "<a href=\"/" + encodeTagName + i + "\" class=\"btn\" title=\"Page " + (i + 1) + "\">" + (i + 1) + "</a>";

                }
                pageIndexs += "";

            }
            pageIndexs += "<a href=\"/" + encodeTagName + 9 + "\" class=\"btn\" title=\"Page " + 10 + "\"> ... </a>";
            pageIndexs += "";
            pageIndexs += "<a href=\"/" + encodeTagName + (page_count - 1) + "\" class=\"btn\" title=\"Page " + (page_count) + "\">" + (page_count) + "</a>";

        } else if (currentIndex > (page_count - 4)) {

            pageIndexs += "<a href=\"/" + encodeTagName + 0 + "\" class=\"btn\" title=\"Page " + 1 + "\">" + 1 + "</a>";
            pageIndexs += "";
            pageIndexs += "<a href=\"/" + encodeTagName + (currentIndex - 4) + "\" class=\"btn\" title=\"Page " + (currentIndex - 3) + "\"> ... </a>";
            for (var i = (page_count - 9); i < page_count; i++) {

                pageIndexs += "";
                if (i == currentIndex) {

                    pageIndexs += "<span class='btn active'>" + (i + 1) + "</span>";
                } else {
                    pageIndexs += "<a href=\"/" + encodeTagName + i + "\" class=\"btn\" title=\"Page " + (i + 1) + "\">" + (i + 1) + "</a>";

                }
            }

        } else {

            pageIndexs += "<a href=\"/" + encodeTagName + 0 + "\" class=\"btn\" title=\"Page " + (1) + "\">" + 1 + "</a>";
            pageIndexs += "";
            pageIndexs += "<a href=\"/" + encodeTagName + (currentIndex - 4) + "\" class=\"btn\" title=\"Page " + (currentIndex - 3) + "\"> ... </a>";
            pageIndexs += "";
            for (var i = currentIndex - 3; i < currentIndex + 4; i++) {
                if (i == currentIndex) {

                    pageIndexs += "<span class='btn active'>" + (i + 1) + "</span>";
                } else {
                    pageIndexs += "<a href=\"/" + encodeTagName + i + "\" class=\"btn\" title=\"Page " + (i + 1) + "\">" + (i + 1) + "</a>";

                }
                pageIndexs += "";
            }
            pageIndexs += "<a href=\"/" + encodeTagName + (currentIndex + 4) + "\" class=\"btn\" title=\"Page " + (currentIndex + 5) + "\"> ... </a>";
            pageIndexs += "";
            pageIndexs += "<a href=\"/" + encodeTagName + (page_count - 1) + "\" class=\"btn\" title=\"Page " + page_count + "\">" + (page_count) + "</a>";
        }
    }
    return pageIndexs;
}
