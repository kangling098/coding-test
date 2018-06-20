let RS = require('./ReadStream');

let WS = require('./WriteStream');

let rs = new RS('./1.txt',{
  highWaterMark:4
})
let ws = new WS('./2.txt', {
  highWaterMark: 1
});

rs.pipe(ws);