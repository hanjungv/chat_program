var express = require('express');
var app = express();
var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});


http.listen(3000,function(){
    console.log('3000 port on');
})

//app.use(express.static(path.join(__dirname, 'public')));


var userList = [];//유저 이름 들어갈 부분

io.on('connection',function(socket){
    var joinedUser = false;
    var nickname;

    //유저입장
    socket.on('join',function(data){
        if(joinedUser){
            return false;   //이미 들어왔던 유저라면 체크가 필요없다.
        }
        nickname = data;
        userList.push(nickname);
        socket.broadcast.emit('join',{
            nickname:nickname,
            userList:userList
        });
        //들어오면 웰컴 메세지 보냄
        socket.emit('welcome',{
            nickname:nickname,
            userList:userList
        });
        joinedUser = true;
    });

    //메세지 전송
    socket.on('msg',function(data){
        console.log('message: '+data);
        io.emit('msg',{
            nickname:nickname,
            msg:data
        })
    });

    //떠남
    socket.on('disconnect', function(){
      if(!joinedUser){
          console.log('error, not joinedUser');
          return false;
      }
      var user = userList.indexOf(nickname);
      userList.splice(user,1);
      socket.broadcast.emit('left',{
          nickname:nickname,
          userList:userList
      });
  });
});
