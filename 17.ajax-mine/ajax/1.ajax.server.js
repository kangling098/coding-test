let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');
let querystring = require('querystring');
let server = http.createServer(function (req,res) {
  let {pathname,query} = url.parse(req.url,true);
  if(pathname === '/login'){
    let method = req.method.toLowerCase();
    if(method === 'get'){
        res.end(JSON.stringify(query));
    }else{
      let buffers = [];
      req.on('data', function (data) {
        buffers.push(data);
      });
      req.on('end', function () {
        let str = Buffer.concat(buffers).toString();
        console.log(str);
        res.end(JSON.stringify(querystring.parse(str)));
      })
    }
    return 
  }
  if(pathname === '/'){
    return fs.createReadStream(path.join(__dirname,'./1.ajax.html')).pipe(res);
  }
  let p = path.join(__dirname, pathname);
  fs.stat(p,function (err,stat) {
    if(!err){
      fs.createReadStream(p).pipe(res);
    }else{
      res.statusCode = 404;
      res.end(`NotFound`);
    }
  })
});
server.listen(3000);