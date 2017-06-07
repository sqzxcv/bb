var mysql = require('mysql');
var async = require("async");
var config = require('../config');
var moment = require('moment');

module.exports = {
    initHeader: initHeader,
}

function initHeader(req) {

    var loginHeader = "<div class='user-btns'><span>欢迎光临<span class='separate'></span><a href='/middle' target='_blank'>充值VIP</a>&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='separate'></span><a href='/login' class='btn-login'>登录</a><span class='separate'></span><a href='/login' class='btn-login'>注册</a><span class='separate'></span></div>";
    var logoutHeader = "<div class='user-btns'><span>欢迎: <span style='color:red'>{{username}}</span>&nbsp;&nbsp;|<span style='color:red'>VIP({{expire}}过期)&nbsp;&nbsp;&nbsp;&nbsp;</span></span><span class='separate'></span><a href='/logout' class='btn-logout'>登出</a><span class='separate'></span></div>";
    var wholeHeader = "<div class='header-inner'><div class='container clearfix'><div class='wrap-logo'><div class='logo logo1'><div class='logo logo1'><a href='/'></a></div></div></div><div class='panel'><div class='cap'></div><div class='menu-btn sendwich' id='menu-btn'><span></span></div><div class='search-btn' id='search-btn'><span></span></div><div>{{{loginStatus}}}</div><div class='panel-group '><nav class='responsive-menu'><ul><li class='{{home}}'><a href='/'>首页</a></li><li class='{{all}}'><a href='/latest-updates'>所有影片</a></li><li class='{{new}}'><a href='/categories/%e6%9c%80%e6%96%b0%e8%a7%86%e9%a2%91'>最新视频</a></li><li class='{{categories}}'><a href='/categories'>影片分类</a></li><li class='{{vip_page}}'><a href='/categories/viplatest-updates'>VIP专区</a></li><li class='{{hd_video}}'><a href='/categories/%e9%ab%98%e6%b8%85'>高清</a></li><li class='{{wuma}}'><a href='/categories/%e6%97%a5%e6%9c%ac%e6%97%a0%e7%a0%81'>无码</a></li><li class='{{china_word}}'><a href='/categories/%e4%b8%ad%e6%96%87%e5%ad%97%e5%b9%95'>中文字幕</a></li><li class='{{zipai}}'><a href='/categories/%e5%9b%bd%e4%ba%a7%e8%87%aa%e6%8b%8d'>国产自拍</a></li></ul></nav><!--搜索框-<div class='search'><form class='form1' action='http://www.99vv1.com/search/'><input type='text' name='q' value='' placeholder='请输入搜索内容'><input type='submit' value=''></form></div>--></div></div></div></div>";
    var headerParter = "";
    if (!req.session.user_id) {
        
        headerParter = loginHeader;
    } else {
        //get user
        headerParter = logoutHeader.replace(/{{username}}/g, req.session.user)
            .replace(/{{username}}/g, req.session.user)
            .replace(/{{expire}}/g, moment.unix(req.session.expirestime).format('YYYY-M-D'));
    }
    wholeHeader = wholeHeader.replace(/{{{loginStatus}}}/, headerParter);
    return wholeHeader;
}