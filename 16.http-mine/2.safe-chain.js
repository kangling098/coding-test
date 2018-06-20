// Referer: http://http://www.zf2.cn:8080/
// 如果当前请求的referer 不允许访问 返回裂图
// 直接打开图片是没问题的
let http = require('http');
let path = require('path');
let p = path.resolve(__dirname,'public');
let url = require('url');
let fs = require('fs');
let {promisify } = require('util');
let stat = promisify(fs.stat);
// 更改host文件
let whiteList = ['www.zf2.cn'];
let server = http.createServer(async function (req,res) {
  let {pathname} = url.parse(req.url); // index.html 2.jpg 1.jpg
  let rp = path.join(p,pathname); // 真是的路径
  let refer = req.headers['referer'] || req.headers['referred'];
  try{
    let s = await stat(rp); // 文件存在就读取相应给客户端
    if(refer){
      // 如果有refer要判断是否和法如果 不合法返回一张裂图
      //  现在再哪里用这张图 www.zf2.cn
      let hostname = url.parse(refer).hostname;
      //  代表当前文件的主机名 www.zf1.cn
      let host = req.headers['host'].split(':')[0];
      if(host !=hostname ){
        if (whiteList.includes(hostname)){
          return fs.createReadStream(path.join(p, '1.jpg')).pipe(res);
        }
        fs.createReadStream(path.join(p,'2.jpg')).pipe(res);
      }else{
        fs.createReadStream(path.join(p, '1.jpg')).pipe(res);
      }
    }else{
      fs.createReadStream(rp).pipe(res);
    }
  }catch(e){
    res.end(`NOT Found`);
  }
});
server.listen(3000);
