let { spawn } = require('child_process');
let path = require('path');


// 独立进程 stdio要设置成和父进程没有关系即可
let child = spawn('node', ['detach.js'], {
  cwd: path.join(__dirname, 'test'),
  stdio: ['ignore', 'ignore', 'ignore'],
  detached:true
});
child.unref(); //  表示父进程挂了 儿子还会继续允许