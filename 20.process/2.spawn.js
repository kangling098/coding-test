let { spawn } = require('child_process');
let path = require('path');
let child = spawn('node',['1.test.js'],{
  cwd:path.join(__dirname,'test'),
  //stdio: ['ignore', 'ignore', 'ignore'] // 忽略子进程执行的结果
  stdio:['ignore','pipe',process.stderr] // pipe表示管道 主进程和子进程是采用流的方式读取和写入的
});
child.stdout.on('data',function (data) {
  console.log(data.toString());
})
child.on('error',function (err) {
  console.log('err');
});
child.on('exit',function () {
  console.log('exit')
});


