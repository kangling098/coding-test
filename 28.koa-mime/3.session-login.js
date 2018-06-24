let Koa = require('koa');
let app = new Koa;
let Router = require('koa-router');
let session = require('koa-session');
let router = new Router();
let fs = require('fs');
let path = require('path');

app.keys = ['zfpx'];
app.use(session({},app));

// 三个路由 第一个是访问/的时候显示一个登陆页
router.get('/',(ctx,next)=>{
  ctx.set('Content-Type','text/html;charset=utf8');
  ctx.body = fs.createReadStream(path.join(__dirname,'index.html'));
})
// 第二个路由 当你点击登录 服务端给你设置一个cookie
router.get('/login',(ctx,next)=>{
  ctx.session.isLogin = 'yes';
  ctx.body = {'login':ctx.session.isLogin};
})
// 第三个路由 客户端发送请求验证一下,他当前是否登录过
router.get('/valiate',(ctx,next)=>{
  ctx.set('Content-Type','application/json')
  console.log(ctx.session.isLogin)
  if(ctx.session.isLogin == 'yes'){
    ctx.body = '已登录';
  }else{
    ctx.body = '未登录';
  }
  
});
app.use(router.routes());
app.listen(3000)
