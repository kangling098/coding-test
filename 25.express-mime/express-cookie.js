let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
app.use(cookieParser('zfpx'));
let querystring = require('querystring');
app.get('/read',function (req,res) {
  //res.send(req.cookies); // 取没有签名的cookie
  res.send(req.signedCookies); // 签名可以防止cookie的篡改
  //res.send(querystring.parse(req.headers.cookie, '; ', '='));
});
app.get('/write',function (req,res) {
  res.cookie('name','zfpx',{signed:true});
  res.cookie('age','9');
  res.send('ok')
})

app.listen(3000);