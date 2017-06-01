var mysql = require('mysql');
var async = require("async");
var config = require('../config');
var moment = require('moment');

module.exports = function (req, res, next, callback) {

    var pool = mysql.createPool({
        host: config['dbhost'],
        user: config['dbuser'],
        password: config['dbpwd'],
        database: "BB",
        connectionLimit: 10,
        port: "3306",
        waitForConnections: false
    });

    pool.getConnection(function (err, connection){

        connection.query("select * from user where username=?", [username], function (err, results, fields){

            if (results.length != 0) {

            }
        });
    })
};