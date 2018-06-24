let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
// let static = require('koa-static');
let path = require('path');
let fs = require('fs');
let util = require('util');
let stat = util.promisify(fs.stat);
let mime = require('mime');
function static(p) {
  return async (ctx,next)=>{
    let execFile ;
    execFile = path.join(p, ctx.path); // 是一个绝对路径
    try{
      let statObj = await stat(execFile);
      if (statObj.isDirectory()) {
        let execFile = path.join(p, 'index.html');
        ctx.set('Content-Type', 'text/html');
        ctx.body = fs.createReadStream(execFile);
      } else {
        ctx.set('Content-Type', mime.getType(execFile));
        ctx.body = fs.createReadStream(execFile);
      }
    }catch(e){ // 如果文件找不到调用下一个中间件(要加return),下一个中间件可能会有异步操作，希望下一个中间件的结果获取完后再让当前的promise执行完成
       return next();
    }
  }
}
app.use(static(path.join(__dirname,'public')));
function fn() {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve('hello world')},3000)
  })
}
router.get('/test',async (ctx,next)=>{
  ctx.body = await fn();
});
app.use(router.routes());
app.use(router.allowedMethods()); // 405
app.listen(3000);