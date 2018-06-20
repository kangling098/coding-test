let fs = require('fs');
let EventEmmitter = require('events');
function computeNewHighWaterMark(n) {
  n--;
  n |= n >>> 1;
  n |= n >>> 2;
  n |= n >>> 4;
  n |= n >>> 8;
  n |= n >>> 16;
  n++;
  return n;
}
class ReadStream extends EventEmmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.autoClose = options.autoClose || true;
    this.encoding = options.encoding || 'utf8';
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.start = options.start || 0;
    this.len = 0; // 当前缓存里多少水
    this.buffers = []; // 缓存区
    this.reading = false;// 如果正在读取时，就不要再去读取了
    this.emittedReadable = false; // 当缓存区长度为0时才会触发事件
    this.pos = this.start; // 位置
    this.open(); // 调用时还没有拿到fd

    this.on('newListener', (type) => {
      if (type === 'readable') { // 看受否监听了readable事件
        this.read(); // 开始读取，读highWaterMark这么多
      }
    })
  }
  read(n) { // n表示需要读多少个
    // 如果缓存区没有东西等会读完内容后需要触发readable事件
    if(n>this.len){ // 更改水位线后重新触发read事件
      this.highWaterMark = computeNewHighWaterMark(n);
      this.emittedReadable = true; 
      this._read();
    }
    let buffer; // buffer就是读取到的内容
    if (n > 0 && n <= this.len) { // 说明缓存里有这么多，在缓存里取出来
      // [buffer<5,6,7,8>,buffer<9,10,11,12>]
      buffer = Buffer.alloc(n); // 读取的结果
      let buf;
      let index = 0;
      let flag = true;
      while (flag && (buf = this.buffers.shift())) {
        for (let i = 0; i < buf.length; i++) {
          buffer[index++] = buf[i];
          if (index === n) {
            flag = false;
            this.len -= n; // 维护缓存;
            let r = buf.slice(i + 1);
            if (r.length) {
              this.buffers.unshift(r); // 将剩余没有消耗的在塞回到数组中
            }
            break;
          }
        }
      }
    }
    if (this.len === 0) {
      this.emittedReadable = true;
    }
    if (this.len < this.highWaterMark) { // 读取内容
      if (!this.reading) { // 默认不是正在读取时才能读取
        this.reading = true;
        this._read(); // 开始读取
      }
    }
    return buffer;
  }
  _read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._read());
    }
    let buffer = Buffer.alloc(this.highWaterMark); // 每次读highWaterMark这么多
    fs.read(this.fd, buffer, 0, buffer.length, this.pos, (err, byteRead) => {
      this.reading = false; // 不是正在读取了
      if (byteRead > 0) {
        this.len += byteRead; // 维护缓存的长度
        this.pos += byteRead;
        this.buffers.push(buffer.slice(0, byteRead)); // 将读取到的buffer放到缓存区中
        if (this.emittedReadable) {
          this.emittedReadable = false; //默认下一次不触发readable事件
          this.emit('readable'); // 可以读取了，默认杯子填满了
        }
      } else {
        this.emit('end'); // 当读取不到内容时触发end事件
      }
    });
  }
  destroy() {
    if (typeof this.fd !== 'number') {
      return this.emit('close');
    }
    fs.close(this.fd, () => {
      this.emit('close');
    })
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit('error', err);
        if (this.autoClose) {
          this.destroy();
        }
        return;
      }
      this.fd = fd;
      this.emit('open', this.fd);
    })
  }
}

module.exports = ReadStream

