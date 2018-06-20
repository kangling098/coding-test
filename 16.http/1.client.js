let http = require('http');
let fs = require('fs');
let pause = false; // 默认开启下载模式
let ws = fs.createWriteStream('./download.txt');
let options = {
  hostname: 'localhost',
  port: 3000,
}
// 实现下载功能
let start = 0;
// Content - Range: bytes 3 - 5 / 58

process.stdin.on('data',function (data) {
  data = data.toString();
  if(data.match(/p/)){
    pause = true;
  }else{
    pause = false;
    download();
  }
})

function download() {
  // 请求之前加一个请求头
  options.headers = {
    'Range': `bytes=${start}-${start + 9}`
  }
  start += 10;// 每次调用时请求的文件位置累加
  http.get(options, function (res) {
    let buffers = [];
    let total = res.headers['content-range'].split('/')[1];
    total = parseInt(total);//58
    res.on('data', function (data) {
      buffers.push(data);
    })
    res.on('end', function () {
      let str = Buffer.concat(buffers).toString();
      ws.write(str);
      if (!pause && start < total) { // 没有完毕才继续请求
        setTimeout(() => {
          download()
        }, 1000);
      }
    })
  });
}
download();