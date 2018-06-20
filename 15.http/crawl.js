let http = require('http');

let server = http.createServer(function (req,res) {
  // 想请求百度
  let options = {
    hostname:'news.baidu.com',
    port:80,
    method:'get'
  }
  let client = http.request(options,function (r) {
      let buffers = [];
      r.on('data',function (data) {
        buffers.push(data);
      });
      r.on('end',function () {
       let result = Buffer.concat(buffers).toString();
        let rs = result.match(/<li class="bold-item"([\s\S]*?)<\/li>/img);
        res.setHeader('Content-Type','text/html;charset=utf8');
        res.end(rs.join('\r\n'));
      })
  });
  client.end();
});
server.listen(8080)