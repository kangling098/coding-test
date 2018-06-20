let Koa = require('koa');
let app = new Koa();
app.use(async (ctx, next)=>{
  if(ctx.path === '/user' && ctx.method === 'GET'){
    ctx.body = `
      <form method="post">
        <input type="text" name="username" autoComplete="off"/>
        <input type="password" name="password" autoComplete="off"/>
        <input type="submit"/>
      </form>
    `
  }
  await next()
})

function bodyParser(ctx){
  return new Promise((resolve,reject)=>{
    let buffers = [];
    ctx.req.on('data',data=>buffers.push(data));
    ctx.req.on('end',_=>resolve(Buffer.concat(buffers).toString()));
  })
}

// koa 1.0使用的是(generator) 2.0是(async await)

app.use(async (ctx,next)=>{
  if(ctx.path === '/user' && ctx.method === 'POST'){
    ctx.body = await bodyParser(ctx);
  }
  next();
})
app.listen(3000)