let {fork} = require('child_process');
let http = require('http');
let path = require('path');
let server = http.createServer(function (req,res) {
  res.end('parent');
}).listen(3000);
let childHttp = fork('http.js',{
  cwd: path.join(__dirname,'test')
})
// send的第二个参数只能放  http的服务或者tcp的服务
childHttp.send('server',server)