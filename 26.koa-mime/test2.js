function app() {
}
app.routes = [];
app.use = function (fn) {
  app.routes.push(fn);
}
function log() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('123');
    }, 1000);
  })
}
app.use(async (req, res, next) => {
  console.log(1);
  await next(); // 第一个函数中如果等待的是一个promise 那么会等待这个promise执行完后 再执行剩下的，如果返回的是undefined,那么不会等待下一个人执行完后在执行
  console.log(2);
})
app.use(async (req, res, next) => {
  console.log(3);
  let r = await log();
  console.log(r);
  next();
  console.log(4);
})
app.use((req, res, next) => {
  console.log(5);
  next();
  console.log(6);
})
let index = 0;
// koa有个特点 中间件内部会处理一下 把他都变成promise
function next() {
  if (app.routes.length === index) return
  let route = app.routes[index++];
  return route({}, {}, () => next());
}
next();

// express 和 koa的中间件的区别
// express中间件不会等待下一个中间件完成
// koa会等待下一个中间完成