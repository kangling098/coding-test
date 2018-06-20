let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let zlib = require('zlib');
let mime = require('mime'); // mime可以根据路径判断当前文件是什么类型
console.log(mime.getType('index.js'));
// 强制缓存
// 浏览器访问服务器 默认服务器会提供一个头 Etag
// 浏览器下次再来的时候 会给一个头 if-none-match

let crypto = require('crypto');
let server = http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url, true);
  let p = path.join(__dirname, pathname);
  fs.stat(p, function (err, stat) {
    if (!err) {
        let d = new Date(Date.now()+5000).toUTCString();
        res.setHeader('Expires', d); // http1.0
        let rs = fs.createReadStream(p);
        let md5 = crypto.createHash('md5');
        rs.on('data',function (data) {
          md5.update(data);
        });
        // 可以用文件的大小和修改时间搭配使用
        // 强制缓存 协商缓存 = 三种都用
        rs.on('end',function () {
          let value = md5.digest('hex');
          let head = req.headers['if-none-match'];
          if(head === value){
            res.statusCode = 304;
            res.end();
          }else{
            res.setHeader('Cache-Control', 'max-age=5') // http1.1
            res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
            res.setHeader('Etag', value);
            fs.createReadStream(p).pipe(res);
          }
        })
    } else {
      res.end();
    }
  })
});
server.listen(3000);