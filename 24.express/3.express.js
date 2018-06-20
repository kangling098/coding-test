let express = require('./express');
let app = express();
let url = require('url');
// express内置了中间件 把想要的方法已经解析好了 可以直接使用
app.use(function (req,res,next) {
  let {path,query} = url.parse(req.url,true);
  req.path = path;
  req.query = query;
  // 装饰模式
  let end = res.end.bind(res);// end方法是需要this的
  res.send = function(value){
    if(typeof value === 'object'){
      end(JSON.stringify(value));
    }else if(Buffer.isBuffer(value) || typeof value ==='string'){
      end(value);
    }
  }
  next();
});

app.get('/article', (req,res,next)=> {
  console.log(req.path,req.query);
  res.send({name:'zfpx'});
});
app.listen(3000);
