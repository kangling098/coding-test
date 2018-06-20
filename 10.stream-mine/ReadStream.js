let fs = require('fs');
let EventEmitter =require('events');

class ReadStream extends EventEmitter {
  constructor(path,options = {}){
    super();
    this.path =path;
    this.highWaterMark = options.highWaterMark || 64*1024;
    this.autoClose = options.autoClose !== undefined ? options.autoClose : true;
    this.start = options.start || 0;
    this.pos = this.start; // pos会随着读取的位置改变
    this.end = options.end || null; // null 表示没传递
    this.encoding = options.encoding || null; // 默认是buffer
    this.flags = options.flags || 'r';

    // 参数的问题
    this.flowing = null; // 非流动模式
    // 创建一个buffer保存读取出来的数据
    this.buffer = Buffer.alloc(this.highWaterMark);
    this.open();
    // {newListener:[fn]}
    // 此方法默认同步调用的
    this.on('newListener',(type) => { // 等待着它监听data
      if(type === 'data'){
        this.flowing = true;
        this.read(); // 开始读取 客户已经监听了data事件
      }
    })
  }
  pause(){
    this.flowing = false;
  }
  resume(){
    this.flowing = true;
    this.read();
  }
  read(){ // 默认第一次调用read方法时,还没有获取到fd,所以不能直接读取
    if(typeof this.fd !== 'number'){
      return this.once('open',()=>{ // 等待着触发open事件后fd肯定拿到了,拿到以后再去执行read方法
        this.read(); 
      })
    }
    // 当获取到fd时 可是读取文件了
    // 第一次

    let howMuchToRead = this.end ? Math.min(this.end-this.pos+1,this.highWaterMark):this.highWaterMark;
    fs.read(this.fd ,this.buffer , 0 ,howMuchToRead, this.pos, (error,byteRead)=>{
      // 读取完毕
      this.pos+=byteRead; // 真实读取出了几个,就往后错几个位置
      // 读取到的数据
      let b = this.encoding ? this.buffer.slice(0,byteRead).toString(this.encoding) : this.buffer.slice(0,byteRead);
      this.emit('data',b);
      // 当流还属于流动模式,并且实际读取到的数据长度 等于 highWaterMark,那么继续读
      if(this.flowing&&(byteRead === this.highWaterMark)){
        return this.read(); 
      }
      if(byteRead < this.highWaterMark){
        // 没有更多数据了
        this.emit('end'); // 读取完毕
        this.destory(); // 销毁
      }
    })
  }
  destory(){
    if(typeof fd !== 'number') return this.emit('close');
    fs.close(fd,()=>{
      this.emit('close');
    })
  }
  open(){
    fs.open(this.path,this.flags,(err,fd)=>{ // fd文件描述符 表示当前this.path这个文件,从3开始(number类型)
      if(err){
        if(this.autoClose){ // 如果需要自动关闭,我就去销毁fd
          this.destory(); // 销毁 (关闭文件,触发关闭事件)
        }
        this.emit('error',err); // 如果有错误,触发error事件
        return;
      }
      this.fd=fd; // 保存文件描述符
    })
  }
}
module.exports = ReadStream;