let http = require('http');
process.on('message',(data,server)=>{
  if(data === 'server' ){
    http.createServer((req,res)=>{
      res.end('child');
    }).listen(server)
  }
})