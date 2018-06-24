let proto = {

}
// ctx.path = ctx.request.path
function defineGetter(property,name) {
  proto.__defineGetter__(name,function () {
    return this[property][name]; 
  })
}
//ctx.body = 'hello' ctx.response.body ='hello'
function defineSetter(property, name) {
  proto.__defineSetter__(name,function (value) {
    this[property][name] = value;
  })
}
defineGetter('request','path');
defineGetter('request','url');
defineGetter('response','body');
defineSetter('response','body');
module.exports = proto;