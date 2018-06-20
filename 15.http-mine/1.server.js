let http = require('http');

let server = http.createServer();
// req是一个可读流 客户端
// res是一个可写流 服务端
server.on('reques',(req,res)=>{
  res.statusCode = 200; //
})