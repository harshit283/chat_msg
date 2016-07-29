

$('#press').click(function () {

    var list = localStorage.getItem('username');
    var todos=[];
    if(list!=null)
    {
        todos= JSON.parse(list);
    }

    for(var i=0;i<todos.length;i++)
    {
        if(todos[i].username == $('#text').val())
        {
            window.alert("USERNAME ALREADY TAKEN");
            window.location.href="";
        }
    }

    todos.push(
        {
            username:$('#text').val()
        }
    );

    localStorage.setItem('username',JSON.stringify(todos));

    $('#div1').css("display","none");
    $('#div2').css("display","block");


     invoke_scipt();

    function invoke_scipt() {



        var username = $('#text').val();

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


        var socket = io();

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

    }


});

