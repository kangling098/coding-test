// 可写流有缓存区的概念
// 1.第一次写入是真的向文件里写，第二次在写入的时候是放到了缓存区里
// 2.写入时会返回一个boolean类型，返回为false时不要再写入了
// 3.当内存和正在写入的内容消耗完后 会触发一个事件 drain
let fs = require('fs');
let WS = require('./WriteStream')
let ws = new WS('./2.txt', {
  flags: 'w', // 默认文件不存在会创建
  highWaterMark: 1, // 设置当前缓存区的大小
  encoding: 'utf8', // 文件里存放的都是二进制
  start: 0,
  autoClose: true, // 自动关闭
  mode: 0o666, // 可读可写
});
// drain的触发时机，只有当highWaterMark填满时，才可能触发drain
// 当嘴里的和地下的都吃完了，就会触发drain方法
let i = 9;
function write() {
  let flag = true;
  while (flag && i >= 0) {
    i--;
    flag = ws.write('111'); // 987 // 654 // 321 // 0
    console.log(flag)
  }
}
write();
ws.on('drain', function () {
  console.log('干了');
  write();
});