let url = require('url');

// pathname代表的是/后面的和?前面的
// query 是查询字符串 a=1&b=2 true {a:1,b:2}
let { pathname, query } = url.parse('http://user:passowrd@www.zf.cn:80/1.html?a=1&b=c#aaa',true);
console.log(pathname, query);
let str = 'a=1&b=c'; // 转化成对象
// let obj = {}
// str.replace(/([^=&]*)=([^=&]*)/g,function () {
//   obj[arguments[1]] = arguments[2]
//   console.log(obj);
// });