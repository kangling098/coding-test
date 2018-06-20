process.on('message',data=>{
  console.log(data);
  process.send(data+'no');
  process.exit();
})