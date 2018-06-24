let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
// 声明前缀
// {
//     prefix:'/home'
//}
let router1 = new Router();
let router2 = new Router();
// 一级路由
router1.post('/hello',(ctx,next)=>{
    ctx.body = 'router hello'
})
// 二级路由
router2.get('/hello',(ctx,next)=>{
    ctx.body = 'hello';
})
router1.use('/home',router2.routes(),router2.allowedMethods());
app.use(router1.routes());
app.use(router1.allowedMethods()); // 会提示用户 当前支持那种方法
app.listen(3000);
