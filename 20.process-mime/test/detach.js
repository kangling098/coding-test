let fs = require('fs');

let ws = fs.createWriteStream('1.txt');

setTimeout(_=>{
  ws.write('12332132132132')
},5000)