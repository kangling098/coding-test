// es6提供的, generator是生成器 ->生成的迭代器
// [Symbol.iterator]后面的函数就叫迭代器函数
// 迭代器函数会返回一个对象 it

let obj = {0:1,1:2,length:2,[Symbol.iterator] : function(){
  let index = 0;
  let that = this;
  return {
    next(){
      return {
        value:that[index],
        done:index++ >= that.length
      }
    }
  }
}}

// let arr = [...obj];
// console.log(arr);


function read(arr){
  let index = 0;
  return {
    next(){
      return {
        value: arr[index],
        done:index++ >= arr.length
      }
    }
  }
}

// let it = read(['vue','react','node']);
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// * 和 yield 一起使用,yield产出

function*gen(thing){ //可以暂停,调用next才会继续走
  let a= yield thing; // a的结果是买回来的菜
  let b= yield a; //
  return b;
}
let a = gen(0); //执行返回的是迭代器
console.log(a.next(1))
console.log(a.next(2))
console.log(a.next(3))
console.log(a.next(4))
console.log(a.next(4))
console.log(a.next(4))

// 第一次调用next 传递的参数没有任何意义,下一次next传递的参数 
// 是上次yield的返回值
// 会结合promise来写点功能