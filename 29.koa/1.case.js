// let Koa = require('./koa/application');
let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
let path = require('path');
// fn1
app.use(async (ctx,next)=>{
    ctx.body = 'hello';
    throw Error('出错了')
});
app.on('error', function (err) {
  console.log(err)
})

app.listen(3000);







// Object.defineProperty()
// let obj = {
//   get a(){ // 其他功能
//     return 100;
//   },
//   set a(value){
//     console.log(value);
//   }
// }
// obj.a = 'hello'



// ctx.req = ctx.request.req = req;
// console.log(ctx.req.path);
// console.log(ctx.request.req.path);
// // ctx这个对象会代理ctx.request上的属性
// // 数据劫持
// console.log(ctx.request.path);
// console.log(ctx.path);
// ctx.body = 'hello'
// console.log(ctx.body)