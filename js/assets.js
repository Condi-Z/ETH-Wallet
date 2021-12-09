let { ipcRenderer } = require('electron');


function getbalance(net, address) {
    ipcRenderer.send("getbalance", net, address);
}

function autoupdate(net, address) {
    ipcRenderer.send("Autoupdate", net, address);
}

ipcRenderer.on("Autoupdate2", (tst, age) => {

    layer.confirm("需要更新!最新版本为: " + age + " 请前往设置更新", { icon: 3, title: '更新' }, function (index) {
    
    layer.close(index);
    });

})

ipcRenderer.on("Autoupdate3", (event, arg) => {
    alert("无法连接至服务器")
})

autoupdate();

