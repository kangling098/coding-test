let options = {
  hostname:'localhost',
  port:3000
}
let http = require('http')
for(var i = 0 ;i<100;i++){
  http.get(options,function (res) {
    res.on('data',function (data) {
      console.log(data.toString());
    })
  })
}