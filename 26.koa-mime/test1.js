function app() {
  
}
app.routes = [];

app.use = function (fn) {
  app.routes.push(fn);
}
app.use((req, res, next) => {
  console.log(1);
  next();
  console.log(2);
})
app.use((req, res, next) => {
  console.log(3);
  next();
  console.log(4);
})
app.use((req, res, next) => {
  console.log(5);
  next();
  console.log(6);
})
let index = 0;
function next() {
  if(app.routes.length === index) return
  let route = app.routes[index++];
  route({},{},()=>next());
}
next();