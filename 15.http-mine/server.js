let net = require('net');
let server = net.createServer();
function parseHeader(h){
  let obj = {};
  let headers = h.split(/\r\n/);
  let line = headers.shift();
  let [method,path,version] = line.split(' ');
  let head = {};
  headers.forEach(line=>{
    let [key,value] = line.split(':');
    head[key] = value;
  })
}