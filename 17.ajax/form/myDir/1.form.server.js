let http = require('http');
let url = require('url');
let querystring = require('querystring');
// let str = "username==123&&password==321";
// // 指定字段之间的分隔符 和 key、value之间的分隔符-》对象
// let obj = querystring.parse(str,'&&','==');
// console.log(obj);



let server = http.createServer(function (req,res) {
    // get请求通过url路径获取
    let {pathname,query} = url.parse(req.url,true);
    let method = req.method.toLowerCase(); // 在node中取到的方法名永远是大写的
    if(pathname === '/form'){
      if(method === 'get'){
        res.end(JSON.stringify(query));
      }else{
        let buffers = [];
        req.on('data',function (data) {
          buffers.push(data);
        });
        req.on('end',function () {
          // 表单格式接收到的数据都是 a=b&c=d这种格式
          // Content-Type:application/x-www-form-urlencoded
          let str = Buffer.concat(buffers).toString();
          res.end(JSON.stringify(querystring.parse(str)));
        })
      }
    }
});
server.listen(3000);
