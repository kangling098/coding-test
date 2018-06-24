let Koa = require('./koa/application');
let app = new Koa();
let fs = require('fs');
let path = require('path');
// fn1
app.listen(3000);
app.use(async (ctx,next)=>{
  ctx.body = 'hello';
  // throw Error('出错了');
});
app.on('error',function(err){
  console.log(err)
})

// let obj = {
//   get a(){
//     return 100
//   },
//   set a(value){
//     console.log(this);
//   }
// }
// obj.a = 'hello'
// console.log(obj.a)


// ctx.req = ctx.request.req = req;
// console.log(ctx,req.path);
// console.log(ctx.request.req.path);