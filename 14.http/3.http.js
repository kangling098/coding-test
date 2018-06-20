let http = require('http');

let server = http.createServer();
server.on('request', function (req,res) {
  res.statusCode = 200;
  res.setHeader('Content-Length',2);
  res.setHeader('Content-Type','text/html;charset=utf8');
  res.end('ok')
});
// 默认连接成功后 会把socket解析成 req,res，解析后触发一个事件，事件叫request
server.on('connection',function (socket) {
// socket  net中的socket
// socket.write(`
// HTTP/1.1 200 OK
// Content-Length: 2
// Content-Type: text/html;charset=utf8

// ok
// `);
//   socket.end();
  console.log('连接成功');
});

server.listen(3000);