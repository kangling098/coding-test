#! /usr/bin/env node
// 第一执行了命令后 会执行 bin/www.js
let yargs = require('yargs')
let argv = yargs.option('port', {
  alias: 'p',
  default: 3000,
  demand: false,
  description: 'this is port'
}).option('hostname', {
  alias: 'host',
  default: 'localhost',
  type: String,
  demand: false,
  description: 'this is hostname'
}).option('dir', {
  alias: 'd',
  default: process.cwd(),
  type: String,
  demand: false,
  description: 'this is cwd'
}).usage('zf-http-server [options]').argv;
let Server = require('../src/app');
new Server(argv).start(); // 开启服务

let platform = require('os').platform();
let {exec} = require('child_process');
if(platform === 'win32'){
  exec(`start http://${argv.hostname}:${argv.port}`);
}else{
  exec(`open http://${argv.hostname}:${argv.port}`);
}
