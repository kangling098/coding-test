let {spawn} = require('child_process');
let path = require('path');
let child = spawn('node',['1.test.js'],{
  cwd:path.join(__dirname,'test'),
  // stdio:'ignore'
  stdio:['ignore','pipe',process.stderr]
})

child.stdout.on('data',data=>{
  console.log(data.toString())
})
child.on('error',function (err) {
  console.log('err');
});
child.on('exit',function () {
  console.log('exit')
});