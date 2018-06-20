let http = require('http');
let fs = require('fs');
let pause = false; // 默认开启下载模式
let ws = fs.createWriteStream('./down.txt');
let options = {
  method : 'get',
  hostname : 'localhost',
  port : 3000
}
// 实现下载功能
let start = 0;
// Content