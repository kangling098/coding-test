// 流 可读流 可写流 双工流 转换流 对象流(gulp)

// fs.createReadStream


let fs = require('fs');
let { Readable } = require('stream');
// createReadStream 调用的是ReadStream这个类，这个类是继承于Readable接口的
// ReadStream这个类实现了一个_read方法(这个方法实现了fs.read)

class MyRead extends Readable{
  _read(){ // 流需要实现一个_read方法，这个方法中push什么结果就是什么
    this.push('100');
    this.push(null); // 如果push null后表示没有可以读到的内容了就
  }
}
let r = new MyRead();
r.on('data',function (data) {
  console.log(data);
});
r.on('readable',function (params) {
  let ret = r.read(1);
  console.log(ret);
})