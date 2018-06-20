function app() {}
app.routes = [];
app.use = function (cb) {
  app.routes.push(cb);
}
app.use((next) => {
  console.log(1);
  next()
  console.log(2);
});
app.use((next) => {
  console.log(3);
  console.log(4);
});
app.use((next) => {
  console.log(5);
  console.log(6);
});
let index = 0;
function next() {
  if(index === app.routes.length)return
  app.routes[index++](next);
}
next();
