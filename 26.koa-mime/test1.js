function app(){

}
app.routes = [];
app.use = function(fn){
  app.routes.push(fn);
}

app.use(async (req,res,next)=>{
  console.log(1)
  await next();
  console.log(2);
})
app.use(async (req,res,next)=>{
  console.log(3)
  await new Promise((resolve,resject)=>{
    setTimeout(function(){
      console.log(123)
      resolve();
    },1000)
  })
  next();
  console.log(4);
})
app.use((req,res,next)=>{
  console.log(5)
  next();
  console.log(6);
})

let index = 0;
function next(){
  if(app.routes.length === index) return 
  let route = app.routes[index++];
  return Promise.resolve(route({},{},()=>next()));
}
next();