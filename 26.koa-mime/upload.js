let Koa = require('koa');
let app = new Koa();
app.use(async (ctx, next) => {
  if (ctx.path === '/user' && ctx.method === 'GET') {
    ctx.body = `
      <form method="post">
        <input type="text" name="username" autoComplete="off"/>      
         <input type="text" name="password" autoComplete="off"/>   
         <input type="submit"/>   
      </form>
    `
  }
  await next();
});
function bodyParser(ctx) {
  return new Promise((resolve, reject) => {
      let buffers = [];
      ctx.req.on('data', function (data) {
        buffers.push(data);
      });
      ctx.req.on('end', function () {
       resolve(Buffer.concat(buffers).toString());
      })
  })
}
// koa 1.0(generator) 2.0(async await)
app.use(async (ctx, next) => {
  if (ctx.path === '/user' && ctx.method === 'POST') {
    ctx.body = await bodyParser(ctx);
  }
  next();
});
app.listen(3000)