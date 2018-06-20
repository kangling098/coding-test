// fs 基础的用法 api
// fs.readFile
let fs = require('fs');
// fs.readFile('./a.txt',{flag:'r'},function(err,data){
//   console.log(data)
// })
fs.writeFile('./b.txt','123',{flag:'w',mode:0o666},function(err,data){
  console.log(data)
})
// 节约内存的copy流 pipe
function copy(source,target){
  let BUFFER_SIZE = 3;
  let buffer = Buffer.alloc(BUFFER_SIZE);
  let index = 0;
  fs.open(source,'r',(err,rfd)=>{ // 开启读取的文件描述符
    if(err) return console.log(err);
    fs.open(target,'w',0o666,(err,wfd)=>{
      function next(){
        fs.read(rfd,buffer,0,BUFFER_SIZE,index,(err,bytesRead)=>{
          fs.write(wfd,buffer,0,bytesRead,index,(err,byteWritten)=>{
            index+=bytesRead;
            if(byteWritten){ // 如果有写入的内容,就继续读取
              next();
            }else{
              fs.close(rfd,()=>{});
              // 把内存中的内容 强制写入后再关闭文件(写入的操作时异步操作)
              fs.fsync(wfd,function(){
                console.log(wfd)
                fs.close(wfd,()=>{
                  console.log('全部写完')
                })
              })
            }
          })
        })
      }
      next();
    })
  })
}
copy('a.txt','b.txt')
let fs = require('fs')
function copy(source,target){
  let BUFFER_SIZE = 3; // 设定buffer大小
  let buffer = Buffer.alloc(BUFFER_SIZE); // 创建buffer
  let index = 0 // 读取以及写入文件的位置
  fs.open(source,'r',(err,rfd)=>{ // 开启读取的文件描述符
    if(err) return console.log(err); // 如果出错,打印错误
    fs.open(target,'w',(err,wfd)=>{ // 开启写入的文件描述符
      if(err) return console.log(err); // 如果出错,打印错误
      next(); // 循环调用,递归读取
      function next(){
        fs.read(rfd,buffer,0,BUFFER_SIZE,index,(err,bytesRead)=>{ //读取文件存入buffer
          fs.write(wfd,buffer,0,bytesRead,index,(err,bytesWritten)=>{ // 读取buffer写入文件
            index+=bytesRead; // 每次读取了几个字节就向后偏移多少字节
            if(bytesWritten){ // 如果有读取到内容,就继续读
              next()
            }else{
              // 没有读到新内容,就关闭 读取的文件
              fs.close(rfd,()=>{})
              // 由于写入是异步的,我们需要把内存中的内容 强制写入目标文件后再关闭文件
              fs.fsync(wfd,()=>{
                console.log('copy 完成')
              })
            }
          })
        })
      }
    })
  })
}
copy('a.txt','b.txt')