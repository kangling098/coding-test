class Promise {
    constructor(executor){
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        // 存放成功的回调函数
        this.onResolvedCallBacks = [];
        // 存放失败的回调函数
        this.onRejectedCallBacks = [];
        let resolve = (data)=>{
            if(this.status === 'pending'){
                this.status = 'resolved';
                this.value= data;
                this.onResolvedCallBacks.forEach(fn=>fn())
            }
        }
        let reject = (err) =>{
            if(this.status === 'pending'){
                this.status = 'rejected';
                this.reason = err;
                this.onRejectedCallBacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve,reject);
        }catch (e){
            reject(e)
        }
    }
    then(onFulfilled,onRejected){
        if (this.status === 'resolved'){
            onFulfilled(this.value);
        }
        if (this.status === 'rejected'){
            onRejected(this.reason);
        }
        // 当前既没有完成 也咩有失败
        if (this.status === 'pending'){
            //存放成功的回调
            this.onResolvedCallBacks.push(()=>{
                onFulfilled(this.value);
            })
            // 存放失败的回调
            this.onRejectedCallBacks.push(()=>{
                onRejected(this.reason);
            })
        }
    }
}
module.exports = Promise;
//写完promise会测试一下