// 模块的分类 三大类
// 1、内置模块 核心模块 fs path http 加载速度比较快

let fs = require('fs'); // 相关api多达 90多个

let path = require('path');
// resolve join basename extname ....
// 解析就是把相对路径变成绝对路径
console.log(path.resolve('./2.txt','./','b'))
console.log(__dirname)
console.log(__filename)
/**
 * path.extname()方法返回path的扩展名,即从path的最后一部分中的最后一个.(句号)字符到字符串结束. 
 * 如果path的最后一部分没有.或path的文件名的第一个字符是. 则返回一个空字符串
 * */ 
console.log(path.extname('1.a.b.c.js')) // .js
console.log(path.extname("./html/a.js")) // .js
console.log(path.extname("./html/.js")) // ''
console.log(path.extname("./html/a")) // ''

console.log(path.basename('./asd/asd/aaa.html'))

console.log(path.posix.sep); // 路径分隔符 linux上是\  windows上是/

// 2. 文件模块 我们自己写的 加载速度慢 (同步加载)
// 自己写的文件

// 3.第三方模块 安装 可以下载后不需要通过路径直接饮用
// npm init -y 先初始化一下 npm install mime
let mime = require('mime'); // 产看类型,第三方模块 需要安装

console.log(mime.getType('less'))