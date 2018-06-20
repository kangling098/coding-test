// node实现tcp协议 给我们提供了一个包 net模块
// 客户端  服务端
let net = require('net');
// socket套接字 会话，http有请求 响应
let server = net.createServer();
// 写一个聊天室 
server.on('connection',function (socket) {
  //socket是一个Duplex 可读可写
  socket.write('欢迎光临');
  //socket.end(); // 相当于关掉客户端
  socket.setEncoding('utf8');
  // 可以通过流的方式接收到数据
  socket.on('data',function (data) {
     console.log(data);
     server.close(); // 如果触发close事件就不会再接收新的请求了
     //server.unref(); // 也表示关闭 ，没有客户端连接会自己关闭(不会触发close事件)
     // unref可以接收新的请求，close不能接收新的请求了
  });
});
server.on('close',function () {
  console.log('服务器关闭');
});
server.maxConnections = 2; // 设置最大连接数，超过数量不能连接
let port = 3000;
server.listen(port,function () {
  console.log(`server start ${port}`);
});
// 如果端口被占用可以监听error事件 重启起一个端口号
server.on('error',function (err) {
  if (err.code === 'EADDRINUSE'){
    server.listen(++port);
  }
});