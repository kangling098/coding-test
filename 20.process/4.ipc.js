let {spawn} = require('child_process');
let path = require('path');

let child = spawn('node',['ipc.js'],{
  cwd: path.join(__dirname,'test'),
  stdio:['pipe',1,'pipe','ipc']
});

child.send('我爱你');
child.on('message',function (data) {
  console.log(data);
  child.kill();
});
