let fs = require('fs');
// pipe方法 叫管道，可以控制速率
let rs = fs.createReadStream('./2.txt',{
  highWaterMark:1
});
let ws = fs.createWriteStream('./1.txt',{
  highWaterMark:3
});
// 会监听rs的on('data'),将读取到的内容调用ws.write方法
// 调用写的方法会返回一个boolean类型
// 如果返回了false就调用rs.pause()暂停读取
// 等待可写流写入完毕后 on('drain')在恢复读取
rs.pipe(ws); // 会控制速率(防止淹没可用内存)