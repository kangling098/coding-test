let http = require('http');
let path = require('path');
let fs = require('fs');
let p = path.join(__dirname,'./1.txt');
let {promisify} = require('util');
let stat = promisify(fs.stat);
let server = http.createServer();

server.on('request',async (req,res)=>{
    let range = req.headers['range'];
    // 如果有range,表示部分获取,否则全部获取
    // Range: bytes=0-3
    try{
        let s = await stat(p);
        let size = s.size;
        if(range){
            let [,start,end] = range.match(/(\d*)-(\d*)/);
            start = start ? Number(start) :0;
            end = end ? Number(end) : size-1;
            res.statusCode = 206;
            // 告诉客户端当前是范围请求
            res.setHeader('Accept-Ranges','bytes');
            res.setHeader('Content-length',end-start+1);
            res.setHeader('Content-Range',`bytes ${start}-${end}/${size}`);
            fs.createReadStream(p,{start,end}).pipe(res);
        } else {
            fs.createReadStream(p),pipe(res);
        }
    }catch(e){
        console.error('error',e)
    }
})
server.listen(3000)