let http = require('http');
let server = http.createServer(function (req,res) {
    if(req.url === '/read'){
      res.end(req.headers['cookie']);
    }else if(req.url === '/write'){
      res.setHeader('Set-Cookie','name=zfpx');
      res.end('oks');
    }else{
      res.end('Not Found');
    }
});

server.listen(3000);