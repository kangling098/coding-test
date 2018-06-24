let Koa = require('koa');
let app = new Koa();
// /read  /write
let Router = require('koa-router');
let router = new Router();
app.keys = ['hello'];
router.get('/write', (ctx, next) => {
  ctx.cookies.set('name','zfpx',{
    domain:'localhost', // 在哪个域名下设置cookie
    path:'/',// 在哪个路径下设置cookie
    maxAge:10*1000, // 最大存活时间
    httpOnly:false,
    overwrite:true,
    signed:true
  });
  ctx.body = 'write ok';
});
router.get('/read',(ctx,next)=>{
  ctx.body = ctx.cookies.get('name',{signed:true}) || '没cookie'
});
app.use(router.routes());
app.use(router.allowedMethods()); // 405
app.listen(3000);