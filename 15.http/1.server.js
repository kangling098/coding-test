let http = require('http');

let server = http.createServer();
// req是一个可读流 客户端
// res是个可写流 服务端
server.on('request',function (req,res) {
  res.statusCode = 200; // 这个地方可以设置也可不设置
  res.sendDate = false;
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader('a', '1');
  res.setHeader('b', '2');
  // res.writeHead(200,{
  //   'Content-Type': 'text/plain;charset=utf-8'
  // }); // 如果调用了writeHead就会直接写入头
  res.end('我很帅');
});
server.listen(3000,function () {
  console.log(`server start 3000`);
});