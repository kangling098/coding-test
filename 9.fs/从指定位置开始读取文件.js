// 从指定位置处开始读取文件
// 4.1 打开文件
// fs.open(filename,flags,[mode],callback);
let fs = require('fs');
// fs.open('./kejian-mime/1.txt','r',0600,(err,fd)=>{
//     console.log(err,fd)
// })

// fs.readFile('./kejian-mime/1.txt',{
//     "encoding":'utf8',
//     "flag":'r'
// },(err,fd)=>{
//     console.log(err,fd)
// })
// fs.writeFile('./a.txt',"你是傻逼吗?",{
//     encoding:null
// },(err,data)=>{
//     console.log(data)
// })

// fs.appendFile('./a.txt',123,(err,data)=>{
//     console.log(err,data)
// })

// 从指定位置处开始读取文件
// 4.1打开文件
fs.open('a.txt','r',0o666,(err,fd)=>{
    console.log(err,fd)
})
// 4.2读取文件
let buffer = Buffer.alloc(6)
fs.read(3,buffer,0,6,6,(err,bytesRead,buffer1)=>{
    console.log(err,bytesRead,buffer1.toString('utf8'))
})