let { ipcRenderer } = require('electron');

function registrpsd() {
  var psd1 = register1.name1.value;
  var psd2 = register1.name2.value;
  if (psd1 == "") {
    // alert("密码不能为空！");
    a = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码不能为空！</div>';
    document.getElementById("state").innerHTML = a;
    return false;
  } else if (psd1.length < 6 || psd1.length > 16) {
    // alert("密码只能为6~16位字符！");
    b = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码只能为6~16位字符！</div>';
    document.getElementById("state").innerHTML = b;
    return false;
  } else {
    // for (var i = 0; i < psd1.length; i++) {
    //   if (!(psd1.charCodeAt(i) >= '0'.charCodeAt() && psd1.charCodeAt(i) <= '9'.charCodeAt()) ||
    //     (psd1.charCodeAt(i) >= 'a'.charCodeAt() && psd1.charCodeAt(i) <= 'z'.charCodeAt()) ||
    //     (psd1.charCodeAt(i) >= 'A'.charCodeAt() && psd1.charCodeAt(i) <= 'Z'.charCodeAt())) {
    //     // alert("密码只能包含英文字母、数字！");
    //     document.getElementById("state").innerHTML = "密码只能包含英文字母、数字！";
    //     return false;
    //   }
    // }
    if (psd1 != psd2) {
      c = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;两次输入密码不一致！</div>';
      document.getElementById("state").innerHTML = c;
    } else {
      ipcRenderer.send("getMnemonic", psd1);
    }
  }
}
function nodisplay() {
  var container = document.getElementById('register1');
  var oDiv = container.getElementsByClassName('tab_re');
  oDiv[0].style.display = "none";
  oDiv[1].style.display = "none";
  oDiv[2].style.display = "none";
  oDiv[3].style.display = "block";
  oDiv[4].style.display = "block";
  oDiv[5].style.display = "block";
}

function yesdisplay () {
  var container = document.getElementById('register1');
  var oDiv = container.getElementsByClassName('tab_re');
  oDiv[0].style.display = "block";
  oDiv[1].style.display = "block";
  oDiv[2].style.display = "block";
  oDiv[3].style.display = "none";
  oDiv[4].style.display = "none";
  oDiv[5].style.display = "none";
  ipcRenderer.send("delfile", 2);
  document.getElementById("state").innerHTML = "";
  document.getElementById("mnemonic").innerHTML = "";
}
function tologin() {
  var container = document.getElementById('register1');
  var oDiv = container.getElementsByClassName('tab_re');
  oDiv[3].style.display = "none";
  oDiv[4].style.display = "none";
  oDiv[5].style.display = "none";
  ipcRenderer.send("createaccount",2);
  d = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>&nbsp;注册成功，正在跳转至登陆界面</div>';
  document.getElementById("state").innerHTML = d;
  setTimeout(() => { ipcRenderer.send("togo", '../html/login.html'); }, 2000);
}

ipcRenderer.on("Mnemonic", (event, arg) => {
  setTimeout(() => { nodisplay(); }, 500);
  setTimeout(() => {
    e = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-tips"></i>&nbsp;注册成功,请牢记您的助记符</div>';
    document.getElementById("state").innerHTML = e;
    document.getElementById("mnemonic").innerHTML = arg;
  }, 1000);
  //  window.location.href = 'login.html';
})
ipcRenderer.on("k", (event, arg) => {
  console.log(arg);
  // setTimeout(() => { nodisplay(); }, 500);
  // setTimeout(() => {
  //   document.getElementById("state").innerHTML = "注册成功" + "=====这是您的助记词请牢记它，并拒绝透露给其他人";
  //   document.getElementById("mnemonic").innerHTML = arg;
  // }, 1000);
  //  window.location.href = 'login.html';
})

// function Mnemonic2(net) {
//   var remnemonic = register2.name3.value;
//   ipcRenderer.send("mnemonic", remnemonic ,net);
// }

function registrpsd2() {
  var remnemonic = register2.name3.value;
  var psd1 = register2.name1.value;
  var psd2 = register2.name2.value;
  if (psd1 == "") {
    // alert("密码不能为空！");
    a = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码不能为空！</div>';
    document.getElementById("state").innerHTML = a;
    return false;
  } else if (psd1.length < 6 || psd1.length > 16) {
    // alert("密码只能为6~16位字符！");
    b = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码只能为6~16位字符！</div>';
    document.getElementById("state").innerHTML = b;
    return false;
  } else {
    // for (var i = 0; i < psd1.length; i++) {
    //   if (!(psd1.charCodeAt(i) >= '0'.charCodeAt() && psd1.charCodeAt(i) <= '9'.charCodeAt()) ||
    //     (psd1.charCodeAt(i) >= 'a'.charCodeAt() && psd1.charCodeAt(i) <= 'z'.charCodeAt()) ||
    //     (psd1.charCodeAt(i) >= 'A'.charCodeAt() && psd1.charCodeAt(i) <= 'Z'.charCodeAt())) {
    //     // alert("密码只能包含英文字母、数字！");
    //     document.getElementById("state").innerHTML = "密码只能包含英文字母、数字！";
    //     return false;
    //   }
    // }
    if (psd1 != psd2) {
      c = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;两次输入密码不一致！</div>';
      document.getElementById("state").innerHTML = c;
    } else {
      ipcRenderer.send("getMnemonic2", psd1 , remnemonic);
    }
  }
  ipcRenderer.send("createaccount",2);
  d = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>&nbsp;正在跳转至登陆界面</div>';
  document.getElementById("state").innerHTML = d;
  setTimeout(() => { ipcRenderer.send("togo", '../html/login.html'); }, 2000);
}
