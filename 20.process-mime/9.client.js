let http = require('http');
for(var i = 0;i<1000;i++){
  http.get({
    port: '3000',
    hostname: 'localhost'
  },(res)=>{
    res.on('data',function (data) {
      console.log(data.toString());
    })
  })
}
