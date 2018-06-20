// 买一个阿里云服务器ECS
// 想在一个服务器上 挂两个网站
// www.zf1.cn => 返回zf1.cn的内容 3000
// www.zf2.cn => 返回zf2.cn的内容  4000
let map = {
  'www.zhufeng2.cn':'http://127.0.0.1:3000',
  'www.zhufeng1.cn':'http://127.0.0.1:4000',
}
let http = require('http');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();
let server = http.createServer(function (req,res) {
  let host = req.headers['host'];
  proxy.web(req,res,{
    target: map[host]
  })
});
server.listen(80);