let fs = require('fs');

let ws =  fs.createWriteStream('1.txt');
setTimeout(() => {
  ws.write('hello')
}, 5000);