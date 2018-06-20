process.on('message',function (data) {
  console.log(data);
  process.send('你好')
})