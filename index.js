const express = require('express');
const app = express();
const dbhandler = require('./dbhandler');
const http = require('http').Server(app);

const io = require('socket.io')(http);


app.use('/',express.static('public'));


app.get('/initial',function (req,res) {


    dbhandler.show(function (err,data) {

         if(err)
             console.log(err);
        else
            res.send(data);
    });

});


io.on('connection',function (socket) {

    socket.on('chat',function (data)
    {
        var obj={};
        obj.id   = (new Date()).getTime();
        obj.user = data.username;
        obj.chatmsg = data.msg;
        dbhandler.insert(obj,function (err,result) {

        });

        io.emit('chat',data);
    })
});



http.listen(5000,function () {
    console.log("Server started and listening at port 5000")
});

