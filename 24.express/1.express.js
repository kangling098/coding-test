// express 快递 
// 特点：基于http服务进行了二次封装
// 在express中扩展了很多 中间件
// 对路由进行了封装
// req,res 进行了一些功能的封装

// koa 和express 怎么理解的 中间件的实现有什么不同

// 先安装express npm i express

// express是一个函数
let express = require('./express');
// express执行后 返回的是一个监听函数
let app = express();
// 中间件作用 当我们真正访问的路由之前可以干很多事情
// 可以决定是否向下执行
// 可以做一些权限判断，可以写多个中间件，和路由是放在同一个队列中的
app.use('/', (req,res,next)=> {
  req.money = 10000;
  next();// 继续的意思，不调用next表示不继续了
});
app.use((req, res, next) =>{
  req.money -= 2000;
  next();
});
app.get('/',(req,res)=>{
  res.end('ok'+req.money);
});

app.get('/hello', (req, res) => {
  res.end('hello');
});
app.delete('/hello', (req, res) => {
  res.end('delete hello');
});
app.post('/hello',(req,res)=>{
  res.end('post hello');
});
app.all('*',(req,res)=>{
  res.end('end');
})
app.listen(3000);
