let http = require('http');

let server = http.createServer();

server.on('request',function (req,res) {
  console.log(req.headers);
  console.log(req.url);
  req.on('data',function (data) {
    console.log(data.toString());
  });
  res.end('hello');
});
server.listen(3000);