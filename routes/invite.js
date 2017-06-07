var mysql = require('mysql');
var async = require("async");
var fs = require("fs");
var path = require("path");
var config = require('../config');

/*

*/
module.exports = function (invitLink, req, res, next, callback) {

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

            connection.query("insert into inviteInfo(invite_code,invite_count) values(?,?) ON DUPLICATE KEY UPDATE invite_count=invite_count + 1", [invitLink, 0], 
            function (err, results, fields) {

                connection.release();
            });
    });
}