let http = require('http');
let server = http.createServer();
server.on('request',function (req,res) {
  // 获取方法
  console.log(req.method);
  console.log(req.url);
  console.log(req.httpVersion);
  console.log(req.headers['content-length']); // 拿到的是请求头对象，你要取里面的具体的参数可以通过key来取(是小写的)
  // 我爱你
  let arr = [];
  // on('data')可能触发多次
  req.on('data',function (data) { // 只要是post请求就需要通过监听data事件获取数据 3g 默认触发一次64k
    arr.push(data);
  });
  req.on('end',function () {
    let str = Buffer.concat(arr);
    console.log(str.toString());
    res.end('hello');
  });
});
server.listen(3000,function () {
  console.log(`server start 3000`);
});

// get(通过url http://xxx?a=1) post(请求体)区别？