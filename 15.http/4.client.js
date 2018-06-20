let http = require('http');
// 可以去做爬虫
let options = {
  hostname:'localhost',
  path:'/a',
  port:3000,
  method:'post',
  headers:{
    a:1,
    'Content-Length':5
  }
}
let client = http.request(options,function (res) {
  res.on('data',function (data) {
    console.log(data.toString());
  });
});
// 发送请求的意思,(只调用end表示没有请求体)
client.write('world')
client.end();