let fs = require('fs');
let { Duplex } = require('stream');
class MyDuplex extends Duplex{
  _read(){
    this.push('hello');
    this.push(null);
  }
  _write(chunk,encoding,callback){
    console.log(chunk);
    callback();
  }
}
let r = new MyDuplex();
r.on('data',function (data) {
    console.log(data);
});
r.write('hello');