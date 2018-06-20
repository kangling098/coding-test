let Koa = require('koa');
let app = new Koa();
function log(){
  return new Promise((resolve,reject)=>{
    setTimeout(_=>{
      resolve('123');
    },1000);
  })
}

app.use(async (ctx,next)=>{
  console.log(1);
 await next(); // 第二个中间件可能有异步逻辑,我们希望的是第一个中间件等待第二个中间件
  console.log(2);
})

app.use(async (ctx,next)=>{
  console.log(3);
  let r = await log();
  console.log(r);
  next();
  console.log(4);
});
app.use((ctx,next)=>{
  console.log(5);
  next();
  console.log(6);
})

app.listen(3000);