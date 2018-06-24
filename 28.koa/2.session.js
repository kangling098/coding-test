let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
let session = require('koa-session');
app.keys = ['zfpx']
app.use(session({},app)); // 用了这个中间件 可以在ctx上增加session属性
router.get('/cross', (ctx,next)=> {
  let n = ctx.session.n || 0;
  ctx.session.n = ++n;
  ctx.body = ctx.session.n;
});
app.use(router.routes());
app.use(router.allowedMethods()); // 405
app.listen(3000);