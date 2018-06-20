let fs = require('fs');
let EventEmitter =require('events');
class WriteStream extends EventEmitter {
  constructor(path,options={}){
    super();
    this.path = path;
    this.flags = options.flags || 'w';
    this.encoding = options.encoding || 'utf8';
    this.start = options.start || 0;
    this.pos = this.start ;
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose === undefined ? true : options.autoClose;
    this.highWaterMark = options.highWaterMark || 16*1024;
    this.open(); // fd异步的 触发一个open事件 当触发open事件后 fd肯定就存在了
    
    // 写文件的时候 需要的参数有哪些
    // 第一次写入是真的往文件里写
    this.writing = false; // 默认第一次就不是正在写入
    // 缓存使用简单的数组来模拟
    this.cache = [];
    // 维护一个变量 标识缓存的长度
    this.len = 0;
    // 是否触发drain事件
    this.needDrain = false;
  }
  cleanBuffer(){
    let buffer = this.cache.shift();
    if(buffer){ // 如果缓存里存在buffer
      this._write(buffer.chunk,buffer.encoding,_=>{
        this.cleanBuffer();
      })
    }else{ // 缓存里没有了
      if(this.needDrain){ // 需要出发drain事件
        this.writing = false; // 告诉下次直接写就可以了 不需要放到缓存里了
        this.needDrain = false;
        this.emit('drain');
      }
    }
  }

  _write(chunk, encoding, clearBuffer){ // 因为write方法是同步调用的,此时fs还没有获取到,所以等待获取到再执行write操作
    if(typeof this.fd !== 'number'){
      return this.once('open',_=>{
        this._write(chunk, encoding,clearBuffer);
      })
    }
    fs.write(this.fd, chunk, 0,chunk.length,this.pos,(err,bytesWritten)=>{
      this.pos +=bytesWritten;
      this.len -=bytesWritten; // 每次写入后就要再内存中减少一些缓存
      clearBuffer(); //第一次就写完了
    })
  }
  write(chunk ,encoding = this.encoding){ // 客户调用的是write方法去写入内容
    // 要判断 chunk必须是buffer或者字符串 为了统一,如果传递的是字符串也要转成buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk,encoding);
    this.len += chunk.length; // 维护缓存的长度 
    let ret = this.len < this.highWaterMark; // 表示,是否填充满缓存区
    this.needDrain = !ret; // 表示是否满足drain
    if(this.writing){ // 如果正在写入,那么将chunk放入内存中
      this.cache.push({
        chunk,
        encoding
      });
    }else{ // 如果是第一次,那么不管是否超缓存了,我们都将它写入进去
      this.writing = true;
      this._write(chunk , encoding, _=>this.cleanBuffer())
    }
    return ret; // 能不能继续写了,false表示下次再写就要占用更多的内存了
  }

  destory(){
    if(typeof this.fd !== 'number'){
      this.emit('close');
    }else {
      fs.close(this.fd,()=>{
        this.emit(close);
      })
    }
  }
  open(){
    fs.open(this.path,this.flags,this.mode,(err,fd)=>{
      if(err){
        this.emit('error',err);
        if(this.autoClose){
          this.destory(); // 如果自动关闭就销毁文件描述符
        }
        return;
      }
      this.fd = fd;
      this.emit('open',this.fd);
    })
  }
}

module.exports = WriteStream;