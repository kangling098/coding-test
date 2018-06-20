let express = require('./express');
let app = express();


// 路径参数 中间件 路由？


app.get('/article/:id', (req,res,next)=> {
  console.log(req.params);
  res.end(JSON.stringify(req.params));
});
app.listen(3000);

// /article/1  /article/:id => {id:1}
// /article/9/zfpx /article/:age/:name =>{age:9,name:zfpx}
// req.params
// let str = '/article/9/zfpx/a';
// let param = '/article/:age/:name/a';
// // 先将age，和age提取出来
// let keys = [];
// let regStr = param.replace(/:([^\/]+)/g,function () {
//   keys.push(arguments[1]);
//   return '([^\/]+)'
// });
// let reg = new RegExp(regStr);
// let arr = str.match(reg); 
// console.log(arr.slice(1));
// console.log(keys);