let Koa = require('koa');
// app是监听函数
// app有两个方法 listen use
let app = new Koa();
let path = require('path');
// koa他封装了 req res => ctx
// ctx中还包含了 request response

let fs = require('fs');
app.use( (ctx,next)=> {
  // ctx.request上 封装了请求的属性 会被代理到ctx
  ctx.set('Content-Type','application/json');
  ctx.body = fs.createReadStream(path.resolve(__dirname,'./package.json'));
});
// 当所有中间件执行完后 会将ctx.body中的内容 取出来 res.end()
app.listen(3000);