let Koa = require('koa');
// app是监听函数
// app有两个方法 listen use
let app = new Koa();
let path = require('path');
// koa他封装了 req res => ctx
// ctx中还包含了 request response

let fs = require('fs');
app.use((ctx,next)=>{
  // ctx.request上封装了请求的属性 会被代理到ctx
  ctx.set('Content-Type','application/json');
  ctx.body = fs.createReadStream(path.resolve(__dirname,'./package.json'));
})
app.listen(3000)