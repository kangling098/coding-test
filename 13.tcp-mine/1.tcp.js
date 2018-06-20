let net = require('net');
let server = net.createServer();
// 写一个聊天室
let port = 3000;
server.listen(port,()=>{
  console.log(`server start ${port}`)
})
server.on('connection',socket=>{
  socket.write('欢迎光临');
  // socket.setEncoding('utf8');
  socket.on('data',data=>{
    console.log(data)
  })
})
