process.on('message',function (data) {
  console.log(data);
  process.send(data+'no');
  //process.exit();// 退出
});
