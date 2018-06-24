let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-better-body');
// 把 1.0的中间件转化成async + await
let convert = require('koa-convert');
let app = new Koa();
let router = new Router();
// 提交的目录 是哪个位置 ctx.request.fields
app.use(convert(bodyParser({
    uploadDir:__dirname
})));
let fs = require('fs');
router.get('/',(ctx,next)=>{
    ctx.set('Content-Type','text/html');
    ctx.body = fs.createReadStream('./index.html');
});

router.post('/upload',(ctx,next)=>{
    ctx.body = ctx.request.fields;
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);


// express 
// express.static koa-static
// express        koa
// bodyParser  => koa-bodyPaser
// x              koa-view 
// cookie-parser  x
// express-session koa-session
// multer         koa-better-body
// x              koa-router