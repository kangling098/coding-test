let fs = require('fs');

let result = fs.readFileSync(__dirname+'/case1.html','utf8');

let school = {name:'zfpx',age:9};

function render(str,obj) {
  return str.replace(/<%=([\s\S]*?)%>/g,function () {
    return obj[arguments[1]]
  })
}
console.log(render(result, school));