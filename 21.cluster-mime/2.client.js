let options = {
  hostname: 'localhost',
  port:3000
}

let http = require('http');
for(let i=0; i<100; i++){
  http.get(options,res=>{
    res.on('data',data=>{
      console.log(data.toString());
    })
  })
}