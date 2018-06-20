let http = require('http');


let client = http.request({
 hostname:'localhost',
 port:3000,
 path:'/',
 method:'post',
 headers:{
  'Content-Type':'text/plain;charset=gbk'
 }
},function (res) {
});
let iconv = require('iconv-lite');
client.end(iconv.encode('我很帅','gbk'));