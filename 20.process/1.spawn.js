// 进程有n个方法 spawn fork exec execFile
// 只有主进程可以开多个子进程
let { spawn } = require('child_process');
let path = require('path');
// spawn 产卵 生小进程
// 进程之间默认数据是不能互相通信的
// process.stdin  0
// process.stdout 1
// process.stderr 2
let child = spawn('node',['1.test.js'],{
  cwd:path.join(__dirname,'test'),
  stdio:[0,1,2] // 将父进程的这三个属性传递给了子进程(共用)
});
child.on('error',function (err) {
  console.log('err');
});
child.on('exit',function () {
  console.log('exit')
});


