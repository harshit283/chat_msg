'use strict';

const mysql = require('mysql');

var connection = {};

function create_connection() {

    connection = mysql.createConnection(
        {
            host     : 'localhost',
            user     : 'chatuser',
            database : 'chatdb'
        }
    );
}

function insert(obj,cb) {

    create_connection();
    connection.connect();
    var str ="insert into chattable  values(" + obj.id + ',' + "'" + obj.user +"'" + ',' + "'" + obj.chatmsg + "'" +');';
    connection.query(str,function (err,result) {
        if(err)
            cb(err,null);
        else
            cb(null,result);
    });

    connection.end();
}

function show(cb) {

    create_connection();
    connection.connect();
    var str = "select * from chattable  order by id desc;";
    connection.query(str,function (err,rows,fields) {

        var data =[];
        if(err)

            cb(err,null);

        else
        {
            for(var x=0;x<rows.length;x++)
            {
                data.push({
                    user:rows[x].user,
                    chatmsg:rows[x].chatmsg
                });
            }

            cb(null,data);
        }
    });

    connection.end();
}


module.exports = {

    insert : insert,
    show : show
};