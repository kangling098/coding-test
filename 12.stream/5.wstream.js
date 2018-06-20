
let fs = require('fs');
let { Writable } = require('stream');

class MyWrite extends Writable{
  _write(chunk,encoding,clearBuffer){ // 可写流必须要调用回调函数
    console.log(chunk);
    clearBuffer();
  }
}
let myWrite = new MyWrite();
myWrite.write('1','utf8',()=>{
  console.log('成功')
});
myWrite.write('1', 'utf8', () => {
  console.log('成功')
});