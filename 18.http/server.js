let http = require('http');
let url=  require('url');
let path = require('path');
let fs = require('fs');
let zlib = require('zlib');
let server = http.createServer(function (req,res) {
  let {pathname} = url.parse(req.url,true);
  let p = path.join(__dirname,pathname);
  fs.stat(p,function (err,stat) {
    if(!err){
      let encoding = req.headers['accept-encoding'];
      if (encoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip');
        let gzip = zlib.createGzip();
        fs.createReadStream(p).pipe(gzip).pipe(res);
      } else if (encoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding', 'bdeflate');
        let deflate = zlib.createDeflate();
        fs.createReadStream(p).pipe(deflate).pipe(res);
      }else{
        fs.createReadStream(p).pipe(res);
      }
    }else{
      res.end();
    }
  })
});
server.listen(3000);