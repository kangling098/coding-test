let http = require('http');
// 可以去做爬虫
let options = {
  hostname:'localhost',
  path:'/a',
  port:3000,
  method:'post',
  headers:{
    a:1,
    'Content-Length':18
  }
}
let client = http.request(options,res=>{
  res.setEncoding='utf8';
  res.on('data',data=>{
    console.log(data.toString());
  })
})
client.write('这里是客户端');
client.end();