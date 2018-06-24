let Koa = require('koa');
let Router = require('koa-router');
// let static = require('koa-static');
let path = require('path');
let fs = require('fs');
let util = require('util');
let stat = util.promisify(fs.stat);
let mime = require('mime');

function static(p){
  return async (ctx,next)=>{
    let execFile;
    execFile = path.join(p,ctx.path); // 是一个绝对路径
    try{
      let statObj = await stat(execFile);
      if(statObj.isDirectory()){
        let execFile = path.join(execFile,'index.html');
        ctx.set('Content-Type','text/html');
      }else{
        ctx.set('Content-Type',mime.getType(execFile));
        console.log(mime.getType(execFile))
      }
      ctx.body = fs.createReadStream(execFile);
    }catch(e){ 
      /**
       * 如果文件找不到调用下一个中间件(需要加return或者 await),
       * 下一个中间件可能是异步操作,希望下一个中间件的结果获取完
       * 后再让当前的promise执行完成
       * */ 
      await next();
    }
  }
}


let app = new Koa();
let router = new Router;
app.use(static(path.join(__dirname,'public')));
router.get('/test',async (ctx,next)=>{
  ctx.body = await fn();
})

function fn(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('hello world');
    },3000)
  })
}

app.use(router.routes());
app.listen(3000)