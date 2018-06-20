let net = require('net');

let server = net.createServer(function (socket) {
    socket.write('hello');
    socket.on('data',function (data) {
      console.log(data);
    })
}).listen(3000);