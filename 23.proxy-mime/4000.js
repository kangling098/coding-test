let http = require('http');

http.createServer(function (req, res) {
  res.end('4000');
}).listen(4000);