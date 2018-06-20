let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// 中间件可以把解析的结果放在req.body属性上
// urlencoded是一个中间件
function urlencoded({ extended }) {
  return (req, res, next) => {
    let buffers = [];
    req.on('data', function (data) {
      buffers.push(data);
    });
    req.on('end', function () {
      let str = Buffer.concat(buffers).toString();
      if (extended) {
        // querystirng 只能解析一层  qs是用来解析多层的
        req.body = require('querystring').parse(str);
      } else {
        req.body = require('qs').parse(str);
      }
      next();
    })
  }
}
function text() {
  return (req,res,next)=>{
    let buffers = [];
    req.on('data',function (data) {
      buffers.push(data);
    });
    req.on('end',function () {
      let str = Buffer.concat(buffers);
      // 用来处理contentType的
      let contentType = require('content-type');
      // 用来处理编码的
      let iconvLite = require('iconv-lite');
      let { parameters: { charset }, type} = contentType.parse(req.headers['content-type']);
      if(type === 'text/plain'){
        // 解码操作
        req.body = iconvLite.decode(str, charset);
        console.log(req.body);
      }
      next();
    })
  }
}
app.use(text());
app.post('/', function (req, res) {
  res.end();
});

app.listen(3000);


// let obj = { name: { name: 1 } } // name={name:1}
// let str = require('qs').stringify(obj);
// console.log(str);