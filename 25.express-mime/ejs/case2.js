let str =  `
  if(name==='zfpx'){
    hello zfpx
  }else{
    hello world
  }
`
let obj = {name:'zfpx'};
function name(obj) {
  let templ = '';
  with (obj) {
    if (name === 'zfpx') {
      templ = 'hello zfpx'
    } else {
      templ = 'hello world'
    }
  }
  return tmpl;
}
console.log(templ);