let fs = require('fs');
let result = fs.readFileSync(__dirname + '/case2.html', 'utf8');
let school = { name: 'zfpx',arr:[1,2,3]};
// eval new Function


function render(str) {
  let head = "let templ = '';\n";
  head += "with (obj){\n templ+=`";
  let content;
  content = result.replace(/<%=([\s\S]+?)%>/g,function () {
    return '${'+arguments[1]+'}';
  });
  content = content.replace(/<%([\s\S]*?)%>/g, function () {
    return "`\n"+arguments[1] + "\n templ+=`";
  });
  let end = "`}\n return templ";
  // 需要让这个字符串运行
  return head + content +end;
}
let r = render(result);
console.log(r);
let fn = new Function("obj", r);
let str = fn(school);

console.log(str);



let script = `
  let a = obj;
  return a;
`
let fn = new Function("obj", script);
console.log(fn.toString());
