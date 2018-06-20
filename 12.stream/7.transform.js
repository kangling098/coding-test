let fs = require('fs');
let { Transform } = require('stream');

// 可以冒充可读流 也可以冒充可写流
// class T1 extends Transform{
//   _transform(chunk,encoding,callback){ // 这个方法和_write一样
//     console.log(chunk.toString().toUpperCase());
//     callback();
//   }
// }
// let t = new T1()
// // 监控用户的输入 将转换流看成可写流
// process.stdin.pipe(t)

class T1 extends Transform{
  _transform(chunk,encoding,callback){
    this.push('123');
    this.push(null);
    callback();
  }
}
let t = new T1();
t.on('readable',function (data) {
    console.log(123123)
    console.log(data);
});
// tcp 写一个聊天室