let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let zlib = require('zlib');
let mime = require('mime'); 
// 对比修改时间的
let server = http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url, true);
  let p = path.join(__dirname, pathname);
  fs.stat(p, function (err, stat) {
    if (!err) {
      if (req.headers['if-modified-since'] === stat.ctime.toUTCString()){
        res.statusCode = 304;
        res.end();
      }else{
        // 第一次设置Last-Modified 下一次请求时 会提供一个头 if-modified-since
        res.setHeader('Last-Modified', stat.ctime.toUTCString());
        res.setHeader('Cache-Control','no-cache');
        fs.createReadStream(p).pipe(res);
      }
    } else {
      res.end();
    }
  })
});
server.listen(3000);