function resolvePromise(promise2,x,resolve,reject){
  // 判断x是不是promise
  // 规范里规定了一段代码,这个代码可以实现我们的promise和别人的promise可以继续拧交互
  if(promise2 ===x){ //不能自己等待自己完成
    return reject(new TypeError('循环引用'));
  }
  // x不是null   或者是对象或者是函数
  if(x !==null && (typeof x ==='object' || typeof x === 'function')){
    let called; //防止成功后调用失败
    try { //防止取then时出现异常 Object.defineProperty 
      let then = x.then ; //取x的then方法 {then:{}}
      if(typeof then ==='function'){ //如果then是函数我就认为他是promise
        //call第一个参数是this ,后面的是成功的回调和失败的回调
        then.call(x,y=>{ //如果y是promise就继续递归解析promise
          if(called) return;
          called = true;
          resolvePromise(promise2,y,resolve,reject);
        },r =>{ //只要失败了就失败了
          if(called) return ;
          called =true;
          reject(r)
        })
      }else { //then是一个普通对象,就直接成功即可
        resolve(x);
      }
    } catch(e){
      if(called)return;
      called = true;
      reject(e);
    }
  }else { //x=123
    resolve(x); //x就是一个普通值,那么直接返回x为成功的参数
  }
}

class Promise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 存放成功回调函数
    this.onResolvedCallBacks = [];
    // 存放失败回调函数
    this.onRejectedCallBacks = [];
    let resolve = (data) => {
      if (this.status === 'pending') {
        this.status = 'resolved';
        this.value = data;
        this.onResolvedCallBacks.forEach(fn => fn());
      }
    }
    let reject = (err) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = err;
        this.onRejectedCallBacks.forEach(fn => fn());
      }
    }
    try {
      executor(resolve, reject);
    }catch(e){
      reject(e);
    }
  }
  then(onFulFilled,onRejected){
    let promise2;
    if(this.status === 'resolved'){
      promise2 = new Promise((resolve,reject)=>{
        // 成功的罗技 失败的逻辑
        let x = onFullfilled(this.value);
        // 看x是不是promise 如果是promise 取他的结果 作为promise2,成功的结果
        // 如果要是返回一个普通值 作为promise2,成功的结果

        // resolvePromise可以解析x和promise2之间的关系
        resolvePromise(promise2,x,resolve,reject);
      })
    }
    if(this.status === 'rejected'){
      promise2 = new Promise((resolve,reject)=>{
        let x = onRejected(this.reason);
        resolvePromise(promise2,x,resolve,reject);
      })
    }
    // 当前既没有成成 也没有失败
    if(this.status === 'pending'){
      promise2 = new Promise((resolve,reject)=>{
        this.onResolvedCallBacks.push(()=>{
          let x = onFullfilled(this.value);
          resolvePromise(promise2,x,resolve,reject);
        });
        // 存放失败的回调
        this.onRejectedCallBacks.push(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2,x,resolve,reject);
        })
      })
    }
    return promise2;
  }
}

module.exports = Promise;