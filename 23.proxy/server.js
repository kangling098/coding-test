let http = require('http');

http.createServer(function (req,res) {
  res.end('google');
}).listen(3000);