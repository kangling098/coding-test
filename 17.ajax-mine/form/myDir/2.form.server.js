let http = require('http');
let url = require('url');
let formidable = require('formidable');
let querystring = require('querystring');
let path = require('path');

let server = http.createServer(function (req,res) {
    let {pathname,query} = url.parse(req.url,true);
    if(pathname === '/form'){
      let method = req.method.toLowerCase(); 
      if(method === 'get'){
        res.end(JSON.stringify(query));
      }else{
        let form = new formidable.IncomingForm();
        // err 文本 文件
        form.uploadDir = path.join(__dirname,'./myDir');
        form.parse(req,function (err,fileds,files) {
          console.log(fileds);
          console.log(files);
        });
        form.on('end', function () {
          res.end('上传成功了')
        });
      }
    }
});
server.listen(3000);


// let contentType = req.headers['content-type'];
// if (contentType === 'application/x-www-form-urlencoded') {
//   let buffers = [];
//   req.on('data', function (data) {
//     buffers.push(data);
//   });
//   req.on('end', function () {
//     let str = Buffer.concat(buffers).toString();
//     console.log(str);
//     //res.end(JSON.stringify(querystring.parse(str)));
//   })
// } else {
//   // 多表单的格式
// }