let Koa = require('koa');
let app = new Koa;
let Router = require('koa-router');
let router = new Router();
let fs = require('fs');
let path = require('path');
let views = require('koa-views');

app.use(views(path.join(__dirname,'public'),{
  map:{'html':'ejs'}
}));
router.get('/',async (ctx,next)=>{
  // 如果不写return 这个函数执行完就结束了 模板还没有被渲染,ctx.body = '';
  // 如果使用return会等待这个饭蝴蝶promise执行完后才把当前的promise完成
  return ctx.render('./template/hello.html',{title:'bkl'})
})
app.use(router.routes());
app.listen(3000);