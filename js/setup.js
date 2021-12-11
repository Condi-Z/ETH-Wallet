let {app, ipcRenderer} = require('electron');
var fs = require("fs");
var os = require("os");
const path = require('path');
var readline = require('readline');
const child = require('child_process')
var exec = require('child_process').execFile;

const accountpath = path.join(__dirname, '../Accountfile/json/account.json');
const netpath = path.join(__dirname, '../Accountfile/json/net.json');
const versionpath = path.join(__dirname, '../Accountfile/json/version');

// const accountpath = path.join(__dirname, '../../Accountfile/json/account.json');
// const netpath = path.join(__dirname, '../../Accountfile/json/net.json');
// const versionpath = path.join(__dirname, '../../Accountfile/json/version');

function createoneaccount() {
    ipcRenderer.send("createaccount", 1);
}

function importaccount(net) {
    var Pkey = Key.value;
    ipcRenderer.send("importaccounts", net, Pkey);
}

ipcRenderer.on("import", (event, Account) => {
    console.log(Account);
    document.getElementById("demo").innerHTML = Account;
})

function Exmnemonic() {
    var PW = PassW.value;
    ipcRenderer.send("Emnemonic", PW);
}

ipcRenderer.on("Emnemonic2", (event, arg) => {
    console.log(arg);
    if (arg == 0) {
        // a = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>&nbsp;密码正确</div>';
        // document.getElementById("confirm").innerHTML = a;
        // document.getElementById("confirm").innerHTML = "密码正确";

        ipcRenderer.send("printemnemonic");
    } else {
        b = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码错误</div>';
        // document.getElementById("confirm").innerHTML = "密码错误";
        document.getElementById("confirm").innerHTML = b;
    }
})

ipcRenderer.on("Mnemonic2", (event, arg) => {
    //   document.getElementById("confirm2").innerHTML = arg;
    layer.open({
        title: "您的助记符如下：",
        type: 1,
        content: arg, //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        area: ['500px', '300px'],
    });
}, 1000);

function Reset() {
    var PW = rset.value;
    ipcRenderer.send("rset", PW);
}

ipcRenderer.on("reset2", (event, arg) => {
    console.log(arg);
    if (arg == 0) {
        a = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>&nbsp;密码正确</div>';
        document.getElementById("confirm3").innerHTML = a;
        ipcRenderer.send("reset3");
    } else {
        b = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码错误</div>';
        document.getElementById("confirm3").innerHTML = b;
    }
})

function addToken() {
    var symbol_1 = addtoken.symbol_1.value;
    var address_1 = addtoken.address_1.value;
    // var abi = addtoken.abi.value;
    console.log("====" + symbol_1)

    // $.getJSON('https://api.etherscan.io/api?module=contract&action=getabi&address=0x92d6c1e31e14520e676a687f0a93788b716beff5&apikey=71CHA5DEEA7KY3KK7SWW8PRP1UVGK2VJ42', function (data) {
    //     var contractABI = "";
    //     contractABI = JSON.parse(data.result);
    //     console.log(contractABI);
    // });
    ipcRenderer.send("addToken", symbol_1, address_1);
}

// ipcRenderer.on("token", (event, Account) => {
//     console.log(Account);
//     document.getElementById("demo").innerHTML = Account ;
// })
function addNet(id, net, chainid, url) {
    ipcRenderer.send("addNet", id, net, chainid, url);
}

ipcRenderer.on("net", (event, state) => {
    console.log(state);
    if (state == 0) {
        console.log("添加成功")
    } else {
        console.log("添加失败")
    }
})

function remove1(id) {
    fs.readFile(netpath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        var delbool = true;
        for (k = 0; k < person.data.length; k++) {
            if (person.data[k].id == id) {
                console.log(k)
                person.data.splice(k, 1);
                delbool = false;
            }
        }
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        if (!delbool) {
            fs.writeFile(netpath, str, function (err) {
                if (err) {
                    console.error(err);
                    console.log("删除失败")
                }
                readNet();
                console.log('删除成功');
            })
        } else {
            readNet();
            console.log('删除失败');
        }
    })
}

function keystore(input, net, keyse_1) {
    if (window.FileReader) {
        var file = input.files[0];
        filename = file.name.split(".")[0];
        var reader = new FileReader();
        reader.onload = function () {
            console.log(this.result)
            var keyse_1 = this.result
            var keyse_2 = keyse2.value;
            ipcRenderer.send("keystores", keyse_1, keyse_2, net);
            ipcRenderer.on("importkeystores", (event, Account) => {
                console.log(Account);
                document.getElementById("demo").innerHTML = Account;

            })
        }
        reader.readAsText(file);

    }
}

function remove2(id) {
    fs.readFile(accountpath, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        var delbool = true;
        for (k = 0; k < person.data.length; k++) {
            if (person.data[k].id == id) {
                console.log(k)
                person.data.splice(k, 1);
                delbool = false;
            }
        }
        //定义一下总条数，为以后的分页打基础
        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        if (!delbool) {
            fs.writeFile(accountpath, str, function (err) {
                if (err) {
                    console.error(err);
                    console.log("删除失败")
                }
                readNet();
                console.log('删除成功');
            })
        } else {
            readNet();
            console.log('删除失败');
        }
    })
}

function chackpass(PSW, PrK) {
    ipcRenderer.send("Cpass1", PSW, PrK);
}

ipcRenderer.on("Cpass2", (event, arg, PrK) => {
    console.log(arg);
    if (arg == 0) {
        // a = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>&nbsp;密码正确</div>';
        // document.getElementById("confirm4").innerHTML = a;
        ipcRenderer.send("Cpass3", PrK);
    } else {
        // b = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码错误</div>';
        // document.getElementById("confirm4").innerHTML = b;
        ipcRenderer.send("Cpass5");
    }
})

ipcRenderer.on("Cpass4", (event, PrK) => {
    layer.open({
        title: "该账户密钥为：",
        type: 1,
        style: 'font-size:100px',
        content: PrK, //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        area: ['500px', '300px'],
    });
});

ipcRenderer.on("Cpass6", (event) => {
    layer.open({
        title: "警告！",
        type: 1,
        content: '<div style="color: red;text-align:center;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码错误</div>', //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        area: ['300px', '100px'],
    });
});

function rts() {
    var PW = rtrans.value;
    ipcRenderer.send("rtrance", PW);
}

ipcRenderer.on("rtrance2", (event, arg) => {
    console.log(arg);
    if (arg == 0) {
        a = '<div style="color: #4ACA85;"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>&nbsp;密码正确</div>';
        document.getElementById("confirm4").innerHTML = a;
        ipcRenderer.send("rtrance3");
    } else {
        b = '<div style="color: red;"><i class="layui-icon layui-icon-face-cry" ></i>&nbsp;密码错误</div>';
        document.getElementById("confirm4").innerHTML = b;
    }
})

ipcRenderer.on("rtrance4", (event, arg) => {
    // document.getElementById("confirm5").innerHTML = "清空成功";
    // layer.open({
    //     type: 1,
    //     content: '清空成功'
    // })
    alert("清空成功!")
})

function update() {
    ipcRenderer.send("Update");
}

ipcRenderer.on("Update2", (tst, age) => {

    layer.confirm("需要更新!最新版本为:" + age, { icon: 3, title: '提示' }, function (index) {
    //do something
    ipcRenderer.send("Update5");
    layer.close(index);
    });

})

ipcRenderer.on("Update3", (event, arg) => {
    alert("无法连接至服务器")
})

ipcRenderer.on("Update4", (event, arg) => {
    alert("已是最新版本!")
})

// ipcRenderer.on("Update6", (event, arg) => {
//     alert("正在下载请稍等")
// })

ipcRenderer.on("loads", (a, b) => {
    document.getElementById("load2").innerHTML = b + "%";
})

// function install() {
//     exec('./Eth Wallet 2.0.exe', function (err, data) {
//         console.log(err)
//         console.log(data.toString());
//     })
// }

ipcRenderer.on("install", () => {
    layer.confirm("下载完成，是否安装", { icon: 3, title: '安装' }, function (index) {
        //项目打包路径
        exec('../../../Eth Wallet 2.0.exe', function (err, data) {
            console.log(err)
            console.log(data.toString());
        })
        layer.close(index);
        });
        //项目调试路径
        // exec('./Eth Wallet 2.0.exe', function (err, data) {
        //     console.log(err)
        //     console.log(data.toString());
        // })
        // layer.close(index);
        // });
    
})

// ipcRenderer.on("version", (nowVersion1, nowVersion2) => {
//     document.getElementById("version1").innerHTML = nowVersion2;
// })

function getversion(){
    fs.readFile(versionpath, function (err, data) {
        if (err) {
          return console.error(err);
        }
        document.getElementById("version1").innerHTML = data;
    })
    
}

getversion();
