// 代理 正向代理 反向代理
// cdn 不等于反向代理 用到了反向代理

// 我访问一个服务 这个服务器可以帮我们访问另一个服务
//  http.request  http-proxy
// webpack-dev-server http-proxy-middlware

let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();
let http = require('http');
http.createServer(function (req,res) {
  proxy.web(req,res,{
    target:'http://localhost:3000'
  })
}).listen(80);

