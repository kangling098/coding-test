class Promise {
  constructor(executor){
    // 一个Promise实例创建出来时,他的默认状态一定是等待态 pending
    this.status = 'pending';
    // 成功时的不可变值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    /**
     * 两个数组 onResolvedCakkbacks和onRejectedCallbacks
     * 用来存放当前promise实例还处于pending状态时添加的成功回调函数
     * 以及失败的回调函数
     * */ 
    this.onResolvedCallbacks=[];
    this.onRejectedCallbacks=[];
    let resolve = data=>{
      /**
       * 确认只有当状态为pending时,改变当前promise实例的状态为fullfilled
       * 并且执行存放在成功回调数组里面的回调函数
       * */
      if(this.status === "pending"){
        // 确定不可变值
        this.value = data;
        // 固定当前实例的状态
        this.status = 'fulfilled';
        this.onResolvedCallbacks.forEach(fn =>fn())
      }
    }
    let rejecte = err =>{
       /**
       * 确认只有当状态为pending时,改变当前promise实例的状态为rejected
       * 并且执行存放在成功回调数组里面的回调函数
       * */
      if(this.status === 'pending'){
        // 获取失败原因
        this.value = err;
        // 固定当前实例的状态
        this.status = 'rejected';
        this.onResolvedCallbacks.forEach(fn =>fn())
      }
    }
    /**
     * 创建Promise实例时,将会直接运行他的执行函数,
     * 并且,如果在执行过程中出现了异常,
     * 将会导致该promise实例的状态变为rejected
     * */ 
    try {
      executor(resolve,reject);
    } catch(e){
      reject(e); // 将错误原因传递出去
    }
  }
  /**
   * Promise实例上的原型上有一个then方法,then方法上有两个参数,分别是
   * 当该实例状态为fulfilled时或者rejected时的回调
   * */ 
  then(onFulFilled,onRejected){
    /**
     * 由于onFulFilled和onRejected可能存在不是函数的问题
     * 所以要对这两个参数进行判断
     * */ 
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : y=>y; 
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}; // 没有传递错误回调时,将错误原因向外抛出
    /**
     * 申明一个变量promise2,为什么要叫promise2? (黑人问号????)
     * 嗯,这是个好问题,因为这是Promise A+规范里面规定的,
     * 同时,规范还规定了,每个Promise的实例的then方法都会返回一个
     * 新的Promise实例,注意,这个新的实例Promsie并不是我们原来的那个Promise实例
     * */
    let promise2; 
    // 当前状态为pending时
    if (this.status === 'pending'){
      promise2 = new Promise((resolve,reject)=>{
        // 存放成功的回调
        this.onResolvedCallbacks.push(()=>{
          /**
           * 在原生es6中,异步运行回调时,Promise.then属于微任务,
           * 但是我们现在只能使用setTimeout来模拟这个异步回调,
           * 导致这里成为了一个宏任务,虽然和原声的Promise对象有点区别,
           * 但是我们的这个Promise仍然是符合 Promise A+规范的
           * 如果我们是在node环境下,也许我们可以使用process.nexttick来进行模拟
           * 这样将会和原声Promise对象表现的更加一致
           * 关于宏任务和微任务的区别,这又要和js事件环联系起来,由于篇幅有限,
           * 大家可以去了解下js事件循环相关的知识
           * */ 
          
          setTimeout(()=>{  
            try {
              /**
               * 获取onFulfilled(this.value)的返回值x,
               * 我们需要一个方法来检测,这个返回值x到底是什么东西,
               * 他是不是一个promise对象?如果他不是promise对象,
               * 那么我们就可以直接把x作为promise2的fulfilled回调函数的参数传过去
               * */ 
              let x = onFulfilled(this.value);
              resolvePromise(promise2,x,resolve,reject);
            } catch(e) {
              reject(e) // 如果运行异常,那么直接让promise2的状态固定为rejected,并把错误原因传递出去
            }
          })
        })
        // 存放失败的回调
        this.onRejectedCallbacks.push(()=>{
          setTimeout(()=>{
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2,x,resolve,reject);
            }catch(e){
              reject(e)
            }
          })
        })
      })
    }
    return promise2;  // Promise实例的then方法,总是返回一个新的Promise
  }
}

// 定义检测x与promise2的方法
function resolvePromise(promise2,x,resolve,reject){
  /**
   * 首先我们要判断x是不是Promise2在规范中,规定了一段代码,这个代
   * 码可以实现我们的promise和别人的promise可以进行交互,但是我们不知道
   * 别人的promise的实现会不会出现 promise2 === x 这种情况的出现,如果
   * 出现这种情况会出现循环引用的问题, promise2 === x,这样,promise2要等待x
   * 的状态改变,而x就是它本身,这样循环引用promise2的状态就会在这里停滞,一直
   * 处于pending状态
   * */ 
  if(promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  // 
}
