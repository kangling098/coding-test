let zlib = require('zlib'); // 核心模块
let path = require('path');
let fs = require('fs');
// 压缩流
// 1.txt.gz
function gzip(source) {
  let gzip = zlib.createGzip(); // 转化流
  fs.createReadStream(source).pipe(gzip).pipe(fs.createWriteStream(source+'.gz'));
}
// gzip(path.join(__dirname, '1.txt'));

function ungzip(source) {
  console.log(source,path.basename(source, '.gz'))
  let ungz = zlib.createGunzip();
  fs.createReadStream(source).pipe(ungz).pipe(fs.createWriteStream(path.join(__dirname,path.basename(source,'.gz'))));
}
ungzip(path.join(__dirname, '1.txt.gz'))