let express = require('express');
let path = require('path');
let app = express();
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'views'));
app.use(function (req, res, next) {
  function render(result) {
    let head = "let templ = '';\n";
    head += "with (obj){\n templ+=`";
    let content;
    content = result.replace(/<%=([\s\S]+?)%>/g, function () {
      return '${' + arguments[1] + '}';
    });
    content = content.replace(/<%([\s\S]*?)%>/g, function () {
      return "`\n" + arguments[1] + "\n templ+=`";
    });
    let end = "`}\n return templ";
    // 需要让这个字符串运行
    return head + content + end;
  }
  res.render = function (filename, data) {
    let p = app.get('views');
    let file = filename + '.' + app.get('view engine');
    let filepath = path.join(p,file);
    let result = require('fs').readFileSync(filepath,'utf8');
    let fn = new Function('obj',render(result))
    res.end(fn(data));
  }
  next();
})
app.get('/', function (req, res) {
  res.render('1', { title: 'hello', arr: [1, 2, 3, 4] });
})
app.listen(3000);




// 设置使用引擎的后缀 默认不需要再去添加后缀
// app.set('view engine', 'html');
// // 设置视图的查找路径
// app.set('views', path.resolve(__dirname, 'views'));
// // 让html用ejs渲染
// app.engine('html', require('ejs').__express);
