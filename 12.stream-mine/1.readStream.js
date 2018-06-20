let fs = require('fs');
// 一般情况下我们不会使用后面的参数
let rs = fs.createReadStream('./1.txt');
rs.setEncoding('utf8');
rs.on('open',function () {
    console.log('open');
});
rs.on('data',function (data) {
  console.log(data);
  rs.pause();
});
setTimeout(() => {
  rs.resume();
}, 1000);
rs.on('end',function (params) {
  console.log('end');
});
rs.on('error',function (err) {
  console.log(err);
});