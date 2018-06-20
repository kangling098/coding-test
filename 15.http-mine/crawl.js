let http = require('http');

let server = http.createServer((req,res)=>{
  // 详情求百度
  let options = {
    hostname:'news.baidu.com',
    port:80,
    method:'get'
  }
  let client = http.request(options,function(r){
    let buffers = [];
    r.on('data',data=>{
      buffers.push(data);
    });
    r.on('end',_=>{
      let result = Buffer.concat(buffers).toString();
      let rs = result.match(/<li class="bold-item"([\s\S]*?)<\/li>/img);
      res.setHeader('Content-Type','text/html;charset=utf8');
      res.end(rs.join('\r\n'))
    })
  })
  client.end();
})
server.listen(8080)