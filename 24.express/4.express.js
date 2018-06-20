let express = require('express');
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
//自己实现中间件 
function static(p) {
  return (req, res, next) => {
    let newPath = path.join(p, req.path);
    fs.stat(newPath, (err, stat) => {
      if (err) {
        next();
      } else {
        if (stat.isDirectory()) {
          let p = path.join(newPath,'/index.html');
          fs.createReadStream(p).pipe(res);
        } else {
          fs.createReadStream(newPath).pipe(res);
        };
      }
    })
  }
}
// app.use(static(__dirname));
// 发送静态文件
// app.get('/404',function (req,res) {
//   res.sendFile('404.html',{root:__dirname});
//   res.sendFile(require('path').join(__dirname,'404.html'));
// })
// app.listen(3000);

// http的文章 