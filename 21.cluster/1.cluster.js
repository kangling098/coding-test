// 集群 父进程里面可以开 子进程
// 父进程和子进程可以共享一段代码

// 进程fork
let cluster = require('cluster');
let len = require('os').cpus().length;
let path = require('path');
// cluster可以判断是否是主进程 ，我们只在主进程中实现fork子进程
cluster.setupMaster({
  exec: path.join(__dirname,'sub.js')
});
for (var i = 0; i < 20; i++) {
  cluster.fork();
}

 


