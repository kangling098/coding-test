let fs = require('fs');

let rs = fs.createReadStream('./1.txt',{
  highWaterMark:5
});
// 暂停模式，可以自己决定读多少
// 如果有消费小于了highWaterMark会再去自动加highWaterMark这么多


// 方法的实现 周日讲，tcp代码部分 http
rs.on('readable',function () {
  let result = rs.read(5);
  console.log(result)
  //console.log(rs._readableState.length); // 当前杯里有多少水
  // let result = rs.read(3);
  // console.log(result);
  // result = rs.read(3);// 如果读取的过多，杯子里没有了，会返回null,给你继续加水(这里再加的水不在是highWaterMark),会再次触发readable
  // // 杯子里的水全部喝完后，还会继续加水
  // console.log(result);
})