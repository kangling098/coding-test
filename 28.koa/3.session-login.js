let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
let fs = require('fs');
let path = require('path');
// 三个路由 第一个是访问/的时候显示一个登录页
router.get('/',(ctx,next)=>{
  ctx.set('Content-Type','text/html')
  ctx.body = fs.createReadStream(path.join(__dirname,'index.html'));
});
router.get('/login',(ctx,next)=>{
  ctx.cookies.set('isLogin',true);
  ctx.body = {'login':true}
});
router.get('/valiate', (ctx, next) => {
  console.log('hello')
  let isLogin = ctx.cookies.get('isLogin');
  console.log(isLogin)
  ctx.body = isLogin;
});
// 第二个路由 当你点击登录 服务端给你设置一个cookie
// 第三个路由 客户端发送请求验证一下，他当前是否登陆过


app.use(router.routes());
app.listen(3000);