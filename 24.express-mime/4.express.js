let express = require('./express');
let app = express();

// 统计请求的时间
app.use(function (req,res,next) {
  console.log(req.path);
  next();
})
app.get('/hello',function (req,res) {
  
})
app.get('/world',function (req,res) {
  
})

let path = require('path');
let fs = require('fs');
// 自己实现中间件

function static(p){
  return (req,res,next)=>{
    let newPath = path.join(p,req.path);
    fs.stat(newPath,(err,stat)=>{
      if(err){ // 如果不存在路径,那么直接下一步,到路由里面找匹配的
        next();
      }else{
        if(stat.isDirectory()){ // 当为文件夹时,在该路径后面拼上index.html
          let p = path.join(newPath,'index.html');
          fs.createReadStream(p,'utf8').pipe(res);
        }else{
          fs.createReadStream(newPath,'utf8').pipe(res);
        }
      }
    })
  }
}

app.use(static(__dirname));
// 发送静态文件
app.listen(3000)

