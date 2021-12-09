let { ipcRenderer } = require('electron');

function sendbalance(net,address,address1,value1,token,Price) {
  ipcRenderer.send("sendbalance", net,address,address1,value1,token,Price );
}

// ipcRenderer.on("tologin", (event, arg) => {
//   if(arg == 0){
//     document.getElementById("state").innerHTML = "登入成功" + "=====三秒后将会跳转至主页面";
//     setTimeout(() => { window.location.href = 'assets.html'; }, 3000);
//   }else{
//     document.getElementById("state").innerHTML = "登入失败";
//   }
// })

function getbalance(net, address) {
  ipcRenderer.send("getbalance", net, address);
}
// ipcRenderer.on("balance", (event, balance) => {
//   console.log(balance);
//   if (balance != "err") {
//       document.getElementById("balance").innerHTML = (balance / 1000000000000000000) + "ETH";
//   }else{
//       document.getElementById("balance").innerHTML ="请检查网络连接，无法获取余额";
//   }
// })

ipcRenderer.on("transaction1", (event, state, hash , address, address1, value1, Price) => {
  console.log(hash);
  document.getElementById("transaction").innerHTML = "交易成功 Hash为:" + hash;
  ipcRenderer.send("complete", hash , address, address1, value1, Price);

})

ipcRenderer.on("transaction2", (event, state, address, address1, value1, Price) => {
  document.getElementById("transaction").innerHTML = "交易失败,请查看交易记录";
  ipcRenderer.send("fail", address, address1, value1, Price);

})
