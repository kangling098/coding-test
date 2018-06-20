let Promise = require('./promise-history1');
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(123)
    },2000)
})
p.then(data=>{
    console.log('data',data)
},err=>{
    console.log('err',err)
})