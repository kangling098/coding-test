let fs = require('fs');

let ws = fs.createWriteStream('./1.txt',{
  highWaterMark:3
});


ws.write('珠峰','utf8',()=>{
  console.log('写完了');
});
ws.write('珠峰', 'utf8', () => {
  console.log('写完了');
});
ws.on('drain', function () { // 如果调用end方法就不会触发drain方法
  console.log('干了')
});
// 调用end时如果传递了参数，会调用write方法将内容写入之后关闭
ws.end('hello'); // 结束写入，调用此方法会把缓存区强制全部写入，并且关闭文件

// write after end  已经关闭了还再写入


// rs.pipe(ws);
