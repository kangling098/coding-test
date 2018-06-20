let fs = require('fs');
let EventEmitter = require('events');
// 如果要将内容全部读出 用on('data') 精确读取on('readable')
class LineReader extends EventEmitter {
  constructor(path) {
    super();
    this.rs = fs.createReadStream(path);
    let RETURN = 0x0d;
    let LINE = 0x0a;
    let arr = [];
    this.on('newListener', (type) => {
      if (type === 'newLine') { // 监听了newLine事件
        this.rs.on('readable', () => {
          let char;
          while (char = this.rs.read(1)) {
            switch (char[0]) {
              case RETURN: // [31,32,33]
                let r = Buffer.from(arr).toString('utf8');
                arr.length = 0;
                this.emit('newLine', r);
                let a = this.rs.read(1); // 读到\r就继续在读一个看看是不是\n如果不是\n说明就是正常的内容
                if (a && a[0] !== LINE) {
                  arr.push(a[0]);
                }
                break;
              case LINE: // 专门处理mac的
                {
                  // mac碰到\n就是换行
                  let r = Buffer.from(arr).toString('utf8');
                  arr.length = 0;
                  this.emit('newLine', r);
                }
                break;
              default:
                arr.push(char[0]);
            }
          }
        });
        this.rs.on('end', () => {
          // 当文件读取完毕后 将最后一行发射出来即可
          let r = Buffer.from(arr).toString('utf8');
          this.emit('newLine', r);
        })
      }
    })
  }
}
let lineReader = new LineReader('./1.txt');
lineReader.on('newLine', function (data) {
  console.log(data, 'len');
})
