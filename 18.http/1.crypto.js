//let crypto = require('crypto'); // 常见的加密模块
// console.log(crypto.getHashes());
// 1)md5摘要算法
// 1.不可逆
// 2.不管加密的内容多长，最后输出的结果长度都是相等的
// 3.内容不同，输出的结果就完全不同，内容相同结果相同
// let md5 = crypto.createHash('md5');
// md5.update('123456'); // update加密
// let result1 = md5.digest('hex');
// console.log(result1);
// 如果存的是密码 多次加密。 拖库

// let fs = require('fs');
// let str = fs.readFileSync(__dirname+'/index.html','utf8');
// let md5 = crypto.createHash('md5');
// md5.update(str);
// let result1 = md5.digest('hex');
// console.log(result1);

// ------------ 加盐算法
// let rs = fs.createReadStream(__dirname + '/index.html',{highWaterMark:3});
// rs.on('data',function (data) {
//   md5.update(data); // update可以调用多次
// });
// rs.on('end', function (data) {
//   console.log(md5.digest('hex'));
// });

// let crypto = require('crypto');
// let fs = require('fs');
// let key = fs.readFileSync(__dirname+'/rsa_private.key')
// let hmac = crypto.createHmac('sha1', key);
// hmac.update('123456');
// let result = hmac.digest('hex');
// console.log(result);


// 对称加密 要是是相同
// let crypto = require('crypto');
// let fs = require('fs');
// let key = fs.readFileSync(__dirname + '/rsa_private.key')
// let cipher = crypto.createCipher('blowfish', key);
// cipher.update('zfpx');
// let result = cipher.final('hex');
// console.log(result);

// let deciper = crypto.createDecipher('blowfish', key);
// // 告诉他刚才加密的是hex
// deciper.update(result,'hex');
// let r = deciper.final('utf8');
// console.log(r);

// 非对称加密
let crypto = require('crypto');
let fs = require('fs');
let public = fs.readFileSync(__dirname+'/rsa_public.key','utf8');
let private = fs.readFileSync(__dirname +'/rsa_private.key','utf8');

let result = crypto.publicEncrypt(public, Buffer.from('hello'));
let r = crypto.privateDecrypt(private, result);
console.log(r.toString());





// 进程 集群 http-server (命令行工具) express 用法
// express常用中间件 cookie session koa koa中间件
// webpack react mongo mysql redis
