// 1).函数可以返回函数

// 类型判断
// function isType(type,content){ //[object String]
//   let t= Object.prototype.toString.call(content).replace(/\[object\s|\]/g,'');
//   console.log(t)
//   return t === type;
// }
// console.log((isType('String','abc')));
// console.log((isType('Number',22.5)));
// console.log((isType('Null',null)));
// console.log((isType('Undefined',undefined)));
// console.log((isType('Function',function(){})));
// console.log((isType('Array',[])));
// console.log((isType('Date',new Date)));
// console.log((isType('RegExp',new RegExp)));
// console.log((isType('Object',{})));

// 批量生产方法 isString('abc') isNumber(123)
// function isType(type){
//   return function(content){
//     return Object.prototype.toString.call(content);
//   }
// }
// let arr = ['String', 'Number','Null','Undefined','Function','Array','Date','RegExp'];
// let util={};
// for (let item of arr){
//   util[`is${item}`]=isType(item);
// }
// console.log(util)

// 2) 函数可以当做参数传递 典型的callBack
// lodash after

// 在调用三次之后 在执行另一个函数
// function after(times , callback){
//   let num=0;
//   return function(){
//     if(++num === times)callback();
//   }
// }
// let chi = after(3,()=>{
//   console.log('chichichi')
// })
// chi();
// chi();
// chi();
let fs=require('fs');
function after(times,callback){
  let arr = [];
  return function(data){
    arr.push(data);
    if(arr.length == times){
      callback(arr);
    }
  }
}
let out = after(2,function(data){
  console.log(data);
})

fs.readFile('./2.promise-mine/a.txt','utf8',function(err,data){
  out(data);
})
fs.readFile('./2.promise-mine/b.txt','utf8',function(err,data){
  out(data);
})