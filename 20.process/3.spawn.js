// 我想执行一个文件 这个文件，会将执行时传递的参数解析后返还给主进程 node a.js --port 3000 --dir aaa,
// 主进程在把结果传递给另一个进程，这个进程负责把结果写到文件中


let {spawn} = require('child_process');
let path = require('path');
let child = spawn('node', ['a.js', '--port','3000','--dir','aaa'],{
  cwd:path.join(__dirname,'test'),
  stdio:'pipe'
});

let child1 = spawn('node', ['b.js'], {
  cwd: path.join(__dirname, 'test'),
  stdio: 'pipe'
});
// stdout.on('end')没有此方法
child.stdout.on('data',function (data) {
  console.log(data.toString());
  child1.stdout.write(data);// 将结果写给另一个进程
});
