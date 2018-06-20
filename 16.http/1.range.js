let http = require('http');
let path = require('path');
let fs = require('fs');
let p = path.join(__dirname,'1.txt');
let { promisify} = require('util');
let stat = promisify(fs.stat); // 将stat方法转化成promise的方法
let server = http.createServer();
server.on('request',async function (req,res) {
  let range = req.headers['range'];
  // 如果有range表示部分获取，否则全部获取
  // Range:bytes=0-3
  try{
    let s = await stat(p);
    let size = s.size;
    if (range) {
      let [, start, end] = range.match(/(\d*)-(\d*)/);
      start = start ? Number(start) : 0;
      end = end ? Number(end) : size-1;
      res.statusCode = 206;
      // 告诉客户端当前是范围请求
      res.setHeader('Accept-Ranges','bytes');
      // 返回的内容长度
      res.setHeader('Content-Length',end-start+1);
      res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
      fs.createReadStream(p,{start,end}).pipe(res);
    } else {
      // 返回文件
      fs.createReadStream(p).pipe(res);
    }
  }catch(e){
    console.log(e);
  }
  
});
server.listen(3000);