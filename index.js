var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});


io.on('connection',function(socket){
    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('client message', function(msg){
       console.log('message2: ' + msg);
       io.emit('server message', msg);
    });
})

http.listen(3000,function(){
    console.log('3000 port on');
})
