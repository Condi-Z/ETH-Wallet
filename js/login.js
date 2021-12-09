let { ipcRenderer } = require('electron');


function checkPass(psd3) {
  ipcRenderer.send("login", psd3);
}
ipcRenderer.on("tologin", (event, arg) => {
  if (arg == 0) {
    a = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>&nbsp;登入成功，正在跳转至主页</div>';
    document.getElementById("state").innerHTML = a;
    //document.getElementById("state").innerHTML = "登入成功" + "三秒后将会跳转至主页面";
    setTimeout(() => { ipcRenderer.send("togo", '../html/assets.html'); }, 2000);
  } else {
    b = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;登入失败，密码错误</div>';
    document.getElementById("state").innerHTML = b;
    setTimeout(() => { document.getElementById("state").innerHTML = "输入密码来解锁您的钱包"; }, 2000);
  }
})

