let http = require('http');
process.on('message',function (data,server) {
  if(data ==='server'){
    http.createServer(function (req, res) {
      res.end('child');
    }).listen(server);
  }
})