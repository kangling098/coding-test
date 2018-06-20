let net = require('net');
// 创建tcp客户端
let socket = net.createConnection({port:3000},function () {
  socket.write('hello');
  socket.on('data',function (data) {
    console.log(data);
  })
});