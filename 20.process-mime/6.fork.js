let { spawn } = require('child_process');
let path = require("path");
// 执行fork.js传递参数默认采用ipc的模式

function fork(modulePath,args,options={}){
  if(options.silent){
    options.stdio = ['ignore','ignore','ignore','ipc'];
  }else{
    options.stdio = [0,1,2,'ipc'];
  }
  return spawn('node',[modulePath,...args],{
    ...options
  })
}

let child = fork('fork.js',['a','b'],{
  cwd: path.join(__dirname,'test'),
  silent:false
})

child.send('hello');

child.on('message',data=>{
  console.log(data)
})