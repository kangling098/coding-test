// let buffer
// buffer = Buffer.alloc(6);
// buffer = Buffer.from([1,255,233])
// buffer = Buffer.from('珠峰')
// console.log(buffer)

// let fs = require('fs');
// let path = require('path');
// let iconvLite = require('iconv-lite'); 
// let r = fs.readFileSync(path.resolve(__dirname,'a.txt'))
// console.log(iconvLite.decode(r,'utf8'))

// BOM头的问题 gb2312 另存为utf8 会出现BOM头
let fs = require('fs');
let {StringDecoder} = require('string_decoder');

let buffer1 = Buffer.alloc(6);
let buffer2 = Buffer.from('珠峰');

buffer2.copy(buffer1,0,0,6);
console.log(buffer1.toString())


let buffer = Buffer.from('珠峰**珠峰**珠峰'); // split
Buffer.prototype.split = function(sep){
  let index = 0;
  let len = Buffer.from(sep).length;
  let i = 0;
  let arr = [];
  while (-1 !== (i = this.indexOf(sep,index))){
    let a = this.slice(index,i);
    index = i + len;
    arr.push(a)
  }
  arr.push(this.slice(index));
  return arr.map(item=>item.toString());
}
let arr = buffer.split('**'); // [<Buffer 珠峰>,<Buffer 珠峰>,<Buffer 珠峰>]
console.log(arr); // buffer的split方法

