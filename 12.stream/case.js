let fs = require('fs');
let rs = fs.createReadStream('./1.txt',{
  highWaterMark:3
});

rs.on('readable',()=>{
  let r = rs.read(5); // 2^4 = 16
  console.log(r);
});


// 本周作业是流（写一篇关于流的文章）