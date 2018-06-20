let http = require('http');
let server = http.createServer();
server.on('request',(req,res)=>{
  console.log(req.headers);
  console.log(req.url);
  req.on('data',data=>{
    console.log(data.toString());
  })
  res.end('你好')
})
server.listen(3000)