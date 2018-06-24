
let express = require('express');
let path = require('path');
let app = express();
// 设置使用引擎的后缀 默认不需要再去添加后缀
app.set('view engine','html')
// 设置视图的查找路径
app.set('views',path.join(__dirname,'views'));
// 让html用ejs渲染
app.engine('html',require('ejs').__express);
app.get('/',(req,res)=>{
  res.render('1',{title:'hello',arr:[1,2,3,4]})
})
app.listen(3000)