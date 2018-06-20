// let {execFile} = require('child_process');

// execFile('node',['--version'],function (err,stdout,stderr) {
//   console.log(stdout);
// })

let {exec} = require('child_process');
// webpack --open
// 执行一些命令
exec('start http://localhost:3000', function (err, stdout, stderr) {
  console.log(stdout);
});
// 服务肯定是多进程的
// 一个服务 执行在多个进程上
// 子进程和父进程 开启的服务可以使用同一个端口
