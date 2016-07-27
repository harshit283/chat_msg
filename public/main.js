
var socket = io();

$(function () {


            const username = prompt("enter username");

            $.get('/initial', function (data,status)
            {

                    var ans='';
                    for(var i=0;i<data.length;i++)
                    {
                        if(data[i].user == username)
                            ans +=  "Me" +":" + data[i].chatmsg + '<br>';
                        else
                            ans +=  data[i].user +":" + data[i].chatmsg + '<br>';
                    }

                    $('#chatbox').html(ans);

            });


    $('#btn').click(function ()
    {
        socket.emit('chat',{
            username : username,
            msg:$('#msg').val()
        });
    });


    socket.on('chat',function (data) {

        if(data.username == username)
             $('#chatbox').prepend("Me " +": " + data.msg + '<br>');
        else
            $('#chatbox').prepend(data.username +":" + data.msg + '<br>');

    });

});