let net = require('net');
// 创建tcp客户端
let socket = net.createConnection({port:3000},_=>{
  socket.write('hello');
  socket.on('data',data=>{
    console.log(data.toString())
  })
})