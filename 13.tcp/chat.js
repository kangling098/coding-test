let net = require('net');
// socket每次都会产生一个新的socket
// 1.你链接我后 提示当前在线人数多少 总共能容纳多少人
// 2.提示请输入用户名
let client = {};
let server = net.createServer(function (socket) {
  server.maxConnections = 4;
  server.getConnections(function (err, count) {
    socket.write(`欢迎到来当前人数为${count},总容纳数${server.maxConnections}\r\n`);
    socket.write(`请输入用户名:\r\n`);
  });
  let nickName;
  socket.setEncoding('utf8');
  socket.on('data', function (chunk) {
    chunk = chunk.replace(/\r\n/, '');
    if (nickName) {
      // 应该把说的内容给别人看
      broadcast(nickName, chunk);
    } else {
      nickName = chunk;
      client[nickName] = socket
    }
  });
});
function broadcast(nickName, chunk) {
  Object.keys(client).forEach(nick => {
    if (nickName != nick) {
      client[nick].write(`${nickName}:${chunk}\r\n`);
    }
  })
}
server.listen(3000, () => {
  console.log(`server start 3000`);
});