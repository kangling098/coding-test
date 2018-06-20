let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
// koa自己实现中间件 写一个函数返回async函数，内部处理好内容，继续执行即可

Buffer.prototype.split = function (sep) {
  let arr = [];
  let index = 0;
  let len = Buffer.from(sep).length;
  console.log(len);
  let offset  = 0;
  while (-1 !== (offset = this.indexOf(sep,index))) {
    console.log(index,offset);
    arr.push(this.slice(index,offset));  
    index = offset + len;  
  }
  arr.push(this.slice(index))
  return arr;
}

function bodyParser() {
  return async (ctx,next)=>{
    await new Promise((resolve, reject)=>{
      let buffers = [];
      ctx.req.on('data',function (data) {
        buffers.push(data);
      })
      ctx.req.on('end',function () {
        let result = Buffer.concat(buffers);
        let value = ctx.get('Content-Type');
        let boundary = value.split('=')[1];
        if(boundary){ // 提交文件的格式是文件类型 multipart/form-data
          boundary = '--' + boundary; // 分界线
          // 将内容 用分界线进行分割 buffer.split()
          let arr = result.split(boundary); // []
          arr = arr.slice(1,-1);
          let obj = {};
          arr.forEach(line=>{ // 拆分每一行
           let [head,content] =  line.split('\r\n\r\n');
           // 看一下头中是否有filename属性
            head = head.toString();
            if(head.includes('filename')){
              // 文件
              // content是文件的内容
              let filename = Math.random()+"";
              let c = line.slice(head.length+4,-2);
              fs.writeFileSync(filename, c );
              obj['filename'] = filename
            }else{
              let key =  head.match(/name="(\w+)"/m);
              key = key[1];
              let value =  content.toString().slice(0,-2);
              obj[key] = value
            }
          });
          ctx.request.body = obj;
        }
        resolve();
      })
    });
    await next();
  }
}
app.use(bodyParser()); // 会把请求体的结果放到 req.request.body
app.use(async (ctx, next) => {
  if (ctx.path === '/user' && ctx.method === 'GET') {
    ctx.body = `
      <form method="post" enctype="multipart/form-data">
        <input type="text" name="username" autoComplete="off"/>      
         <input type="text" name="password" autoComplete="off"/> 
         <input type="file" name="avatar"/>  
         <input type="submit"/>   
      </form>
    `
  }
  await next();
});
app.use(async (ctx, next) => {
  if (ctx.path === '/user' && ctx.method === 'POST') {
   ctx.body = ctx.request.body;
  }
  next();
});
app.listen(3000)