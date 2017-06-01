var mysql = require('mysql');
var async = require("async");
var config = require('../config');
var moment = require('moment');

module.exports = {
    initHeader: initHeader,
}

function initHeader(req) {

    var loginHeader = "<div class='user-btns'><span>欢迎光临<span class='separate'></span><a href='/login' target='_blank'>充值VIP</a>&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='separate'></span><a href='/login' class='btn-login'>登录</a><span class='separate'></span><a href='/login' class='btn-login'>注册</a><span class='separate'></span></div>";
    var logoutHeader = "<div class='user-btns'><span>欢迎: <span style='color:red'>{{username}}</span>&nbsp;&nbsp;|<span style='color:red'>VIP({{expire}}过期)&nbsp;&nbsp;&nbsp;&nbsp;</span></span><span class='separate'></span><a href='/logout' class='btn-logout'>登出</a><span class='separate'></span></div>";

    if (!req.session.user_id) {

        return loginHeader;
    } else {
        //get user
        logoutHeader = logoutHeader.replace(/{{username}}/g, req.session.user)
        .replace(/{{username}}/g, req.session.user)
        .replace(/{{expire}}/g, moment.unix(req.session.expirestime).format('YYYY-M-D'));
        return logoutHeader;
    }
}