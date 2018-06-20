let fs =require('fs');
let EventEmitter = require('events');

class ReadStream extends EventEmitter {
  constructor(path,options){
    super();
    this.path = path;
    this.flags = options.flages || 'r';
    this.autoClose = options.autoClose === undefined ? true : options.autoClose
    this.encoding = options.encoding || null;
    this.highWaterMark = options.highWaterMark || 64*1024;
    this.start = options.start || 0;
    this.len = 0; // 当前缓存区缓存的buffer总长度
    this.buffers = []; // 申明一个数组,用来存放缓存的buffer
    this.reading = false; // 一个状态,当前是否在读取,正在读的视乎,就不要再读了
    this.emittedReadable = false; // 当缓存区buffer总长度为0时才会触发事件
    this.pos = this.start; // 文件读取的位置偏移
    this.open(); // 创建可读流时,自动读取,由于fs.open是异步操作,这个时候还没有拿到fd

    this.on('newListener',type=>{
      if(type === 'readable'){ // 看是否监听了readable事件
        this.reading(); // 开始读取,读 highWaterMark这么多的数据
      }
    })
  }

  read(n){ // n 表示要读多少个
    // 如果缓存区没有东西等会读完内容后需要触发readable事件
  }  






  open(){
    fs.open(this.path,this.flags,(err,fd)=>{
      if(err){
        this.emit('error',err);
        if (this.autoClose){ // 设置了自动关闭,那么,将可读流销毁
          this.destory(); 
        }
        return;
      }
      this.fd = fd;
      this.emit('open',this.fd);
    })
  }
}

 let rs = new ReadableStream('./a.txt')
 console.log(rs)
module.exports = ReadStream;