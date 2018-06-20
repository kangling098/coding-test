let {promisify} = require('bluebird');
let fs = require('fs');
let read = promisify(fs.readFile);
// read('a.txt','utf8').then(data=>{
//   console.log(data)
// })
function *gen(){
  let b = yield read('a.txt','utf8');  //read('a.txt','utf8')为一个promise
  let c = yield read(b,'utf8'); //read(b,'utf8') 也是一个promise
  return 'c:'+c;
}
let it =gen();
// it.next().value.then(data=>{
//   it.next(data).value.then(data=>{
//     console.log(it.next(data).value)
//   })
// })
// let co = require('co');
co(gen()).then(data=>{
  console.log(data)
})

function co(it) {
  // 异步递归怎么实现
  return new Promise((resolve,reject)=>{
    function next(data){ //next是为了实现一步迭代
      let {value , done} = it.next(data);
      if(!done){
        value.then(data=>{
          // 当第一个promise执行完再继续执行下一个next
          next(data);
        },reject); //有一个失败了就失败了
      }else{  // 迭代成功后将成功的结果返回
        resolve(value)
      }
    }
    next();
  })
}
setTimeout(()=>{console.log('我执行了')})
    for(let i=0;i<10000000000;i++){};