var mysql = require('mysql');
var async = require("async");
var fs = require("fs");
var path = require("path");
var config = require('../config');
var initHeader = require("../common/initHeader").initHeader;

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
        connectionLimit: 10,
        port: "3306",
        waitForConnections: false
    });

    // var self = this;
    var videoCountPage = 30;
    pool.getConnection(function (err, connection) {

        if (err || connection == undefined) {

            console.error("链接数据库失败:" + err.message);
            next();
            return;
        }
        var sqlstr = "";
        if (tagname.length != 0) {

            sqlstr = "select * from videos where videoid in (select videoid from tagmap where tagname='" + tagname + "') order by videoid desc limit " + videoCountPage * index + ", " + videoCountPage + ";"
        } else {
            sqlstr = "select * from videos order by videoid desc limit " + videoCountPage * index + ", " + videoCountPage + ";";
        }
        connection.query(sqlstr, function (err, results, fields) {

            connection.release();
            var activeTab = "home";
            switch (tagname) {
                case "": activeTab = "home";
                    break;
                case "all": activeTab = "all";
                    break;
                case "最新视频": activeTab = "new";
                    break;
                case "categories": activeTab = "categories";
                    break;
                case "viplatest-updates": activeTab = "vip_page";
                    break;
                case "高清": activeTab = "hd_video";
                    break;
                case "日本无码": activeTab = "wuma";
                    break;
                case "中文字幕": activeTab = "china_word";
                    break;
                case "国产自拍": activeTab = "zipai";
                    break;
                default:
                    activeTab = "";
            }
            var headerContent = initHeader(req);
            headerContent = headerContent.replace(eval("/{{"+activeTab+"}}/"),"active");
            if (results.length != 0) {

                var rootUrl = "http://www.99vv1.com/";
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
                        item = itemModel.replace(/{{detail}}/g, "/detail/" + results[i]['video_index'])
                            .replace(/{{thumbnail}}/g, results[i]['thumbnail'])
                            //.replace(/{{thumbnail}}/g,"./Oshine_files/preview3-650x385.jpg")
                            .replace(/{{title}}/g, results[i]['title'])
                            .replace(/{{view_count}}/g, results[i]['view_count'])
                            .replace(/{{rate}}/g, Number(rate * 100).toString() + "%")
                            .replace(/{{duration}}/g, Number((results[i]['duration'] / 1000) / 60).toFixed(0).toString() + ":" + Number((results[i]['duration'] / 1000) % 60).toString())
                            .replace(/{{thumbnails}}/g, path.dirname(results[i]['thumbnail']) + "/");

                        if (i == 0) {
                            node = item;
                        } else {
                            node += "\n" + item;
                        }

                        if (i != 0 && i % (Math.floor(Math.random() * 3)) == 0) {

                            item = adModel.replace(/{{content}}/, "<script src='http://js.taobaogj.com/vs.php?id=724'></script>");
                            node += "\n" + item;
                        }
                    }

                    var pageIndexs = "";
                    if (index == 0) {
                        pageIndexs = "<a href=\"/" + 0 + "/\" class=\"btn\" title=\"Page 02\">上一页</a>";

                    } else {
                        pageIndexs = "<a href=\"/" + (index - 1) + "/\" class=\"btn\" title=\"Page 02\">上一页</a>";
                    }
                    pageIndexs += "<span> • </span>";
                    pageIndexs += "<span class='btn active'>" + (index + 1) + "</span>";
                    pageIndexs += "<span> • </span>";
                    pageIndexs += "<a href=\"/" + (index + 1) + "/\" class=\"btn\" title=\"Page 02\">下一页</a>";
                    res.render('index', {
                        "VIDEOITEM": node,
                        "title": "爱吧",
                        "video_count": "展示" + results.length + "个视频",
                        "pageIndexs": pageIndexs,
                        "tdappid": config["tdappid"],
                        "appversion": config["appversion"],
                        "header": headerContent
                    });
                } else {
                    next();
                }
            } else {
                // next();
                var pageIndexs;
                if (index == 0) {
                    pageIndexs = "<a href=\"/" + 0 + "/\" class=\"btn\" title=\"Page 02\">上一页</a>";

                } else {
                    pageIndexs = "<a href=\"/" + (index - 1) + "/\" class=\"btn\" title=\"Page 02\">上一页</a>";
                }
                pageIndexs += "<span> • </span>";
                pageIndexs += "<span class='btn active'>" + (index + 1) + "</span>";
                pageIndexs += "<span> • </span>";
                pageIndexs += "<a href=\"/" + (index + 1) + "/\" class=\"btn\" title=\"Page 02\">下一页</a>";
                res.render('index', {
                    "VIDEOITEM": "",
                    "title": "爱吧",
                    "video_count": "没有更多",
                    "pageIndexs": pageIndexs,
                    "tdappid": config["tdappid"],
                    "appversion": config["appversion"],
                    "header": headerContent
                });
            }
            callback(err);
        });
    });
};
