// 1.如果想说话时赋予一些特殊意义 你可以自己增加一些表示
// l: 看所有的在线人数
// s:zs:i love you
// r:ls
// b:广播和所有人说话
// clinet = {127.0.0.1:8080:{nickName:'匿名',socket:sokect}}
let net = require('net');
let client = {};
let server = net.createServer(function (socket) {
  server.maxConnections = 4;
  server.getConnections(function (err, count) {
    socket.write(`欢迎到来当前人数为${count},总容纳数${server.maxConnections}\r\n`);
  });
  let key = socket.remoteAddress + socket.remotePort;
  socket.setEncoding('utf8');
  client[key] = { nickName: '匿名', socket };
  socket.on('data', function (chunk) {
    chunk = chunk.replace(/\r\n/, '');
    let char = chunk.split(':')[0];
    let content = chunk.split(':')[1];
    switch (char) {
      case 'l':
        showList(socket); // 显示用户列表
        break;
      case 's': // s:zs:内容
        private(chunk.split(':')[1], chunk.split(':')[2], client[key].nickName);
        break;
      case 'r':
        rename(key, content); // r:xxx
        break;
      case 'b':
        broadcast(key, chunk.split(':')[1], client[key].nickName);
      default:
        break;
    }
  })
});
function broadcast(key, chunk, nickName) {
  Object.keys(client).forEach(nick => {
    if (key != nick) {
      client[key].socket.write(`${nickName}:${chunk}\r\n`);
    }
  });
}
function private(nickName, content, n) {
  // {8080:{nickName,socket}}
  let s;
  Object.keys(client).forEach(key => {
    if (client[key].nickName === nickName) {
      s = client[key].socket
    }
  });
  s.write(`${n}:${content}\r\n`);
}
function rename(key, chunk) {
  client[key].nickName = chunk;
}
function showList(socket) {
  let users = [];
  Object.keys(client).forEach(key => {
    users.push(client[key].nickName);
  });
  socket.write(`当前用户列表:\r\n${users.join('\r\n')}\r\n`);
}

server.listen(3000, () => {
  console.log(3000);
})