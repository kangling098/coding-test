let http = require('http');

http.createServer((req,res)=>{
  res.end('google');
}).listen(3000);