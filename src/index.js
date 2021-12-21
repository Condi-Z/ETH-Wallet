const { app, BrowserWindow, ipcMain, remote } = require('electron');
const path = require('path');
const { contextIsolated, Start_addressill } = require('process');
const { readdirSync, rmdirSync, unlinkSync, statSync } = require('fs');
const fs = require('fs');
const Web3 = require('web3');
const readline = require('readline');
const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');
const util = require('ethereumjs-util');
const Tx = require('ethereumjs-tx');
const crypto = require('crypto');
const { keccak } = require('ethereumjs-util');
const CryptoJS = require('crypto-js');
const electron = require('electron');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var request = require('request');
var progress = require('progress-stream');
var exec = require('child_process').execFile;
var http = require('http');


//项目调试路径
const eptionmcpath = path.join(__dirname, '../Accountfile/eptionmc.txt');
const hashpath = path.join(__dirname, '../Accountfile/hash.txt');
const accountpath = path.join(__dirname, '../Accountfile/json/account.json');
const netpath = path.join(__dirname, '../Accountfile/json/net.json');
const tokenlistpath = path.join(__dirname, '../Accountfile/json/tokenlist.json');
const erc20abi = path.join(__dirname, '../Accountfile/json/erc20abi.json');
const mnemonicpath = path.join(__dirname, '../Accountfile/mnemonicpath.txt');
const accountpath2 = path.join(__dirname, '../Accountfile/json/account2.json');
const transactionpath = path.join(__dirname, '../Accountfile/json/transaction.json');
const transactionpath2 = path.join(__dirname, '../Accountfile/json/transaction2.json');
const versionpath = path.join(__dirname, '../Accountfile/json/version');
//打包路径
// const eptionmcpath = path.join(__dirname, '../../Accountfile/eptionmc.txt');
// const hashpath = path.join(__dirname, '../../Accountfile/hash.txt');
// const accountpath = path.join(__dirname, '../../Accountfile/json/account.json');
// const netpath = path.join(__dirname, '../../Accountfile/json/net.json');
// const tokenlistpath = path.join(__dirname, '../../Accountfile/json/tokenlist.json');
// const erc20abi = path.join(__dirname, '../../Accountfile/json/erc20abi.json');
// const mnemonicpath = path.join(__dirname, '../../Accountfile/mnemonicpath.txt');
// const accountpath2 = path.join(__dirname, '../../Accountfile/json/account2.json');
// const transactionpath = path.join(__dirname, '../../Accountfile/json/transaction.json');
// const transactionpath2 = path.join(__dirname, '../../Accountfile/json/transaction2.json');
// const versionpath = path.join(__dirname, '../../Accountfile/json/version');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
var pass = "";
const createWindow = (Start_address, height, width, event) => {
  const Menu = electron.Menu;
  Menu.setApplicationMenu(null)
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, Start_address));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  const nowVersion = app.getVersion();
  console.log(nowVersion);
  fs.writeFile(versionpath, nowVersion, 'utf8', function (error) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('当前版本写入成功');

  })

};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  startup();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // docStart_address icon is clicStart_addressed and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function startup() {

  fs.readFile(hashpath, 'utf8', (err, files) => {
    if (err) {
      console.log(err)
      Start_address = "../html/register.html"
    }
    console.log('--------------------', files)
    if (files.length != 0) {
      console.log("Login===>");
      var height = 400;
      var width = 600;
      Start_address = "../html/login.html"
      createWindow(Start_address, height, width);
    } else {
      console.log("register===>");
      var height = 800;
      var width = 600;
      Start_address = '../html/register.html'
      createWindow(Start_address, height, width);
    }
  })
}

function addPreZero(num) {
  var t = (num + '').length,
    s = '';
  for (var i = 0; i < 64 - t; i++) {
    s += '0';
  }
  return s + num;
}

function pass1(p) {
  pass = p;
  if ((pass.length / 2) < 17) {
    for (var i = 0; i < (17 - (pass.length / 2)); i++) {
      pass += "0";
    }
  }
}

function encrypt(word) {
  var key = CryptoJS.enc.Utf8.parse(pass);
  console.log(key);
  var plaintText = word; // 明文
  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  console.log("加密前：" + plaintText);
  console.log("加密后：" + encryptedData);
  //var str = JSON.stringify(encryptedData);
  console.log("类型" + typeof (encryptedData));
  console.log("=====" + encryptedData.ciphertext.toString());
  return encryptedData.ciphertext.toString();
}

function decrypt(encryptedData) {
  var key = CryptoJS.enc.Utf8.parse(pass);
  console.log(key);
  //encryptedData = encrypted.ciphertext.toString();
  var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);
  var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  console.log("解密后:" + decryptedStr);

  return decryptedStr;
}

const createaccounts = async (arg, nub) => {
  console.log(arg + "===========" + nub)
  var word = bip39.entropyToMnemonic(arg);
  console.log(word);
  let seed = await bip39.mnemonicToSeed(word);
  console.log("seed：" + util.bufferToHex(seed));
  let hdWallet = hdkey.fromMasterSeed(seed)

  fs.readFile(accountpath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);
    console.log(pass);
    for (i = 0; i < nub; i++) {
      //4.生成钱包中在m/44'/60'/0'/0/i路径的keypair
      let key = hdWallet.derivePath("m/44'/60'/0'/0/" + person.total)
      //5.从keypair中获取私钥
      console.log("私钥：" + util.bufferToHex(key._hdkey._privateKey))
      //6.从keypair中获取公钥
      console.log("公钥：" + util.bufferToHex(key._hdkey._publicKey))
      //7.使用keypair中的公钥生成地址
      let address = util.pubToAddress(key._hdkey._publicKey, true)
      //编码地址
      console.log('account', i + 1, '0x' + address.toString('hex'))
      var private = util.bufferToHex(key._hdkey._privateKey);
      var res = private.substr(2);
      console.log(util.bufferToHex(key._hdkey._privateKey))
      console.log(res);
      let o = encrypt(res);
      console.log(o);
      var account = {
        id: "Account" + person.total,
        address: ('0x' + address.toString('hex')),
        Publickey: util.bufferToHex(key._hdkey._publicKey),
        PrivateKey: o
      };
      person.data.push(account);
      person.total = person.total + 1;
      //分割线console.log("__________________________________________________________")
    }
    //将字符串转换为json对象
    //将传来的对象push进数组对象中
    //定义一下总条数，为以后的分页打基础
    var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(accountpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('----------新增成功-------------');
    })
  })
}

const importAccount = async (Pkey, Account) => {
  fs.readFile(accountpath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);
    let o = encrypt(Pkey);
    var account = {
      id: ("import" + person.import),
      address: Account,
      Publickey: "",
      PrivateKey: o,
    };
    person.data.push(account);
    person.import = person.import + 1;
    //分割线console.log("__________________________________________________________")
    //将字符串转换为json对象
    //将传来的对象push进数组对象中
    //定义一下总条数，为以后的分页打基础
    var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(accountpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('----------新增成功-------------');
    })
  })
}

const addtoken1 = async (symbol, address, abi) => {
  fs.readFile(tokenlistpath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);
    var token = {
      symbol: symbol,
      address: address
    };
    person.data.push(token);
    person.total = person.total + 1;
    var str = JSON.stringify(person);
    fs.writeFile(tokenlistpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('----------新增成功-------------');
      var url = './json/token/' + symbol + '.json'
      console.log(url);

      // var Web3 = require('web3');
      // var web3 = new Web3(new Web3.providers.HttpProvider());
      // var version = web3.version.api;
      // $.getJSON('https://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', function (data) {
      //     var contractABI = "";
      //     contractABI = JSON.parse(data.result);
      //     if (contractABI != ''){
      //         var MyContract = web3.eth.contract(contractABI);
      //         var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
      //         var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
      //         console.log("result1 : " + result);            
      //         var result = myContractInstance.members(1);
      //         console.log("result2 : " + result);
      //     } else {
      //         console.log("Error" );
      //     }            
      // });
    })
  })
}

ipcMain.on('getMnemonic', (event, arg) => {
  event.reply('getMnemonic', "注册");
  console.log(arg);
  let mnemonic = bip39.generateMnemonic();
  console.log(mnemonic);
  var encrytMnemonic = bip39.mnemonicToEntropy(mnemonic)
  console.log(encrytMnemonic);

  fs.writeFile(mnemonicpath, mnemonic, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('----------成功-------------');
  });

  fs.writeFile(eptionmcpath, encrytMnemonic, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('----------成功-------------');
  });

  let finalpsd = arg + encrytMnemonic;
  console.log(finalpsd);
  var hash = crypto.createHash('SHA256').update(finalpsd).digest('hex');

  fs.writeFile(hashpath, hash, err => {
    if (err) {
      console.log(err)
      return false
    }
    console.log('写入成功');
    pass1(arg);
    console.log(hash);
    event.sender.send("Mnemonic", mnemonic);
  })
})

ipcMain.on('togo', (event, url) => {
  var no = '../html/login.html';
  if (url == no) {
    app.relaunch();
    app.quit();
  } else {
    app.quit();
    createWindow(url, 800, 1200);
  }
  // const mainWindow = new BrowserWindow({
  //   width: 1000,
  //   height: 700,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     contextIsolation: false
  //   }
  // });
  // //mainWindow.loadFile(path.join(__dirname, Start_address));
  // mainWindow.loadURL(path.join(__dirname, url));
})

ipcMain.on('login', (event, arg) => {
  event.reply('login', "登入")
  console.log(arg)
  fs.readFile(eptionmcpath, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(data.toString());
    var finalpsd = arg + data.toString();
    console.log(finalpsd);
    fs.readFile(hashpath, (err, data1) => {
      if (err) {
        console.log(err);
        return false;
      }
      var hash = crypto.createHash('SHA256').update(finalpsd).digest('hex');
      console.log(hash);
      console.log(data1.toString());
      if (hash == data1.toString()) {
        pass1(arg);
        event.sender.send("tologin", 0)
      } else {
        event.sender.send("tologin", 1)
      }
    })
  })
})

ipcMain.on('createaccount', (event, nub) => {
  event.reply('createaccount', "创建账户")

  fs.readFile(eptionmcpath, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      createaccounts(data.toString(), nub);
      //event.sender.send("fuck", data.toString());
      // event.sender.send("fuck", eptionmc)
    }
  })
})

ipcMain.on('delfile', (event) => {

  event.reply('delfile', "delfile")
  fs.writeFile(hashpath, "", (err) => {
    if (err) {
      return err;
    }
    console.log('文件:' + hashpath + '删除成功！');
  })
  fs.writeFile(eptionmcpath, "", (err) => {
    if (err) {
      return err;
    }
    console.log('文件:' + eptionmcpath + '删除成功！');
  })
})

ipcMain.on('getbalance', (event, net, address) => {
  event.reply('getblance', "获取余额")
  console.log(net);
  console.log(address);
  fs.readFile(tokenlistpath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();
    person = JSON.parse(person);
    fs.readFile(erc20abi, function (err, abi) {
      if (err) {
        return console.error(err);
      }
      var contractAbi = abi.toString();
      contractAbi = JSON.parse(contractAbi);
      var text = '{ "value" :[]}';
      var balancearray = JSON.parse(text);
      console.log(person[net].length);
      for (k = 0; k < person[net].length; k++) {
        var contractAddress = person[net][k].address;
        console.log(contractAddress);
        web3 = new Web3(new Web3.providers.HttpProvider(net))
        if (contractAddress == "") {
          web3.eth.getBalance(address, function (error, balance) {
            if (!error) {
              let value = {
                "symbol": "ETH",
                "balance": balance
              }
              console.log(balance);
              balancearray.value.push(value);
              if (k == person[net].length) {
                console.log(balancearray);
                event.sender.send("balance", balancearray);
              }
            } else {
              console.error(error + "查询失败");
              // event.sender.send("balance", "err");
            }
          })
        } else {

          console.log("symbol" + person[net][k].symbol)
          var myContract = new web3.eth.Contract(contractAbi, contractAddress);
          myContract.methods.balanceOf(address).call({ from: address }, function (error, result) {
            if (!error) {
              let value = {
                "symbol": "text",
                "balance": result
              }
              balancearray.value.push(value);
              console.log(result);
              event.sender.send("balance", balancearray);
              if (k == person[net].length) {
                console.log(balancearray);
                event.sender.send("balance", balancearray);
              }
            } else {
              console.log(error);
            }
          });
        }
      }
    })
  });

  // .then(balance => {
  //   console.log(balance);
  //   event.sender.send("balance", balance)
  // })
})

ipcMain.on('sendbalance', (event, net, address, address1, value1, token, Price , Price2) => {
  event.reply('sendbalance', "转账")
  console.log(net);
  console.log("from====>" + address);
  console.log("to======>" + address1);
  console.log("value===>" + value1);
  console.log("token===>" + token);
  console.log("Price===>" + Price);
  web3 = new Web3(new Web3.providers.HttpProvider(net))
  var sendvalue;
  var date1 = '';
  var toaddress;
  var transferAmount;
  if (Price == ""){
    var Price1 = "22000000";
    web3.eth.getGasPrice().then(function () {
      console.log("gasPrice1===>" + Price1);
      if (token == "ETH") {
        var gaspricevalue = web3.utils.toWei(Price1.toString(), 'wei');
        console.log("gaspricevalue===>" + gaspricevalue);
      } else {
        var gasPrice2 = Price1 * 10;
        console.log("gasPrice2===>" + gasPrice2);
        var gaspricevalue = 10e9;
        console.log("gaspricevalue===>" + gaspricevalue);
  
      }
      web3.eth.getTransactionCount(address, web3.eth.defaultBlock.pending).then(function (nonce) {
        fs.readFile(netpath, function (err, data) {
          if (err) {
            return console.error(err);
          }
          var person = data.toString();//将二进制的数据转换为字符串
          person = JSON.parse(person);
          console.log(pass);
          for (k = 0; k < person.data.length; k++) {
            if (person.data[k].net == net) {
              console.log("k=========>" + k);
              console.log("chainid===>" + person.data[k].chainid);
              console.log("toaddress===>" + toaddress);
              console.log("address===>" + address);
              console.log("date1===>" + date1);
  
              var txData = {
                // nonce每次++，以免覆盖之前pending中的交易
                chainId: web3.utils.toHex(person.data[k].chainid),
                nonce: web3.utils.toHex(nonce++),
                // 设置gasLimit和gasPrice
                gasLimit: web3.utils.toHex(99000),
                gasPrice: web3.utils.toHex(gaspricevalue),
                // 要转账的哪个账号  
                to: toaddress,
                // 从哪个账号转
                from: address,
                // 0.001 以太币
                value: transferAmount,
  
                data: date1
              }
              //console.log(web3.utils.toHex(10e17));
              var tx = new Tx(txData);
              fs.readFile(accountpath, function (err, data1) {
                if (err) {
                  return console.error(err);
                }
                var person1 = data1.toString();//将二进制的数据转换为字符串
                person1 = JSON.parse(person1);
                console.log(pass);
                for (k = 0; k < person1.data.length; k++) {
                  if (person1.data[k].address == address) {
                    console.log(k)
                    let o = decrypt(person1.data[k].PrivateKey);
  
                    const privateKey = new Buffer.from(o.toString(), 'hex');
                    tx.sign(privateKey);
                    var serializedTx = tx.serialize().toString('hex');
                    console.log("私钥=============》" + o.toString());
                    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
                      if (!err) {
                        console.log(hash);
                        event.sender.send("transaction1", 0, hash, address, address1, value1, Price);
                      } else {
                        console.error(err);
                        event.sender.send("transaction2", 1, address, address1, value1, Price);
                      }
                    });
                  }
                }
              })
            }
          }
        })
      })
    })
  
    if (token == "ETH") {
      sendvalue = value1;
      transferAmount = web3.utils.toHex(web3.utils.toWei(sendvalue.toString(), 'ether'));
      console.log("transferAmount===>" + transferAmount);
      console.log("hextransferAmount===>" + web3.utils.toHex(transferAmount));
      toaddress = address1;
    } else {
      fs.readFile(tokenlistpath, function (err, data) {
        if (err) {
          return console.error(err);
        } {
          var person = data.toString();//将二进制的数据转换为字符串
          person = JSON.parse(person);
          for (k = 0; k < person[net].length; k++) {
            if (person[net][k].symbol == token) {
              toaddress = person[net][k].address;
              date1 = '0x' + 'a9059cbb' + addPreZero(address1.substr(2)) + addPreZero(web3.utils.toHex(value1).substr(2));
              transferAmount = '0x00';
            }
          }
        }
      })
    }
  }else{
    var Price2 = Price;
    web3.eth.getGasPrice().then(function () {
      console.log("gasPrice1===>" + Price2);
      if (token == "ETH") {
        var gaspricevalue = web3.utils.toWei(Price2.toString(), 'wei');
        console.log("gaspricevalue===>" + gaspricevalue);
      } else {
        var gasPrice2 = Price2 * 10;
        console.log("gasPrice2===>" + gasPrice2);
        var gaspricevalue = 10e9;
        console.log("gaspricevalue===>" + gaspricevalue);
  
      }
      web3.eth.getTransactionCount(address, web3.eth.defaultBlock.pending).then(function (nonce) {
        fs.readFile(netpath, function (err, data) {
          if (err) {
            return console.error(err);
          }
          var person = data.toString();//将二进制的数据转换为字符串
          person = JSON.parse(person);
          console.log(pass);
          for (k = 0; k < person.data.length; k++) {
            if (person.data[k].net == net) {
              console.log("k=========>" + k);
              console.log("chainid===>" + person.data[k].chainid);
              console.log("toaddress===>" + toaddress);
              console.log("address===>" + address);
              console.log("date1===>" + date1);
  
              var txData = {
                // nonce每次++，以免覆盖之前pending中的交易
                chainId: web3.utils.toHex(person.data[k].chainid),
                nonce: web3.utils.toHex(nonce++),
                // 设置gasLimit和gasPrice
                gasLimit: web3.utils.toHex(99000),
                gasPrice: web3.utils.toHex(gaspricevalue),
                // 要转账的哪个账号  
                to: toaddress,
                // 从哪个账号转
                from: address,
                // 0.001 以太币
                value: transferAmount,
  
                data: date1
              }
              //console.log(web3.utils.toHex(10e17));
              var tx = new Tx(txData);
              fs.readFile(accountpath, function (err, data1) {
                if (err) {
                  return console.error(err);
                }
                var person1 = data1.toString();//将二进制的数据转换为字符串
                person1 = JSON.parse(person1);
                console.log(pass);
                for (k = 0; k < person1.data.length; k++) {
                  if (person1.data[k].address == address) {
                    console.log(k)
                    let o = decrypt(person1.data[k].PrivateKey);
  
                    const privateKey = new Buffer.from(o.toString(), 'hex');
                    tx.sign(privateKey);
                    var serializedTx = tx.serialize().toString('hex');
                    console.log("私钥=============》" + o.toString());
                    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
                      if (!err) {
                        console.log(hash);
                        event.sender.send("transaction1", 0, hash, address, address1, value1, Price);
                      } else {
                        console.error(err);
                        event.sender.send("transaction2", 1, address, address1, value1, Price);
                      }
                    });
                  }
                }
              })
            }
          }
        })
      })
    })
  
    if (token == "ETH") {
      sendvalue = value1;
      transferAmount = web3.utils.toHex(web3.utils.toWei(sendvalue.toString(), 'ether'));
      console.log("transferAmount===>" + transferAmount);
      console.log("hextransferAmount===>" + web3.utils.toHex(transferAmount));
      toaddress = address1;
    } else {
      fs.readFile(tokenlistpath, function (err, data) {
        if (err) {
          return console.error(err);
        } {
          var person = data.toString();//将二进制的数据转换为字符串
          person = JSON.parse(person);
          for (k = 0; k < person[net].length; k++) {
            if (person[net][k].symbol == token) {
              toaddress = person[net][k].address;
              date1 = '0x' + 'a9059cbb' + addPreZero(address1.substr(2)) + addPreZero(web3.utils.toHex(value1).substr(2));
              transferAmount = '0x00';
            }
          }
        }
      })
    }
  }


});

ipcMain.on('importaccounts', (event, net, Pkey) => {
  event.reply('importaccounts', "导入账户")
  web3 = new Web3(new Web3.providers.HttpProvider(net));
  var huanyuan = web3.eth.accounts.privateKeyToAccount(Pkey);
  var Account = huanyuan.address
  event.sender.send("import", Account);
  importAccount(Pkey, Account);
})

ipcMain.on('addToken', (event, symbol, address) => {
  event.reply('addToken', "添加代币")
  addtoken1(symbol, address)
  //event.sender.send("token", "ok");
})

ipcMain.on('addNet', (event, id, net, chainid, url) => {
  event.reply('addNet', "添加网络")
  var web = {
    id: id,
    net: net,
    chainid: chainid,
    url: url
  };
  fs.readFile(netpath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);//将字符串转换为json对象
    var json1 = true;
    for (k = 0; k < person.data.length; k++) {
      if ((person.data[k].id == web.id) || (person.data[k].id == web.net)) {
        json1 = false;
      }
    }
    if (json1) {
      person.data.push(web);//将传来的对象push进数组对象中
      person.total = person.data.length;//定义一下总条数，为以后的分页打基础
      var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
      fs.writeFile(netpath, str, function (err) {
        if (err) {
          console.error(err);
        }
        console.log('----------新增成功-------------');
        fs.readFile(tokenlistpath, function (err, data) {
          if (err) {
            return console.error(err);
          }
          var token = {
            symbol: "ETH",
          };
          var person = data.toString();//将二进制的数据转换为字符串
          person = JSON.parse(person);
          person[web.net] = [token];

          var str = JSON.stringify(person);
          fs.writeFile(tokenlistpath, str, function (err) {
            if (err) {
              console.error(err);
            }
          })
        })
        event.sender.send("net", 0);
      })
    } else {
      event.sender.send("net", 1);
      console.log("添加失败")
    }
  })
})

// ipcMain.on('mnemonic', (remnemonic) => {
//   mnemonicaccounts(remnemonic);
//   //var Account = huanyuan.address
//   //event.sender.send("import", Account);
//   //importAccount(Pkey, Account);
// })

ipcMain.on('getMnemonic2', (event, arg, remnemonic) => {
  event.reply('getMnemonic2', "助记符还原");
  console.log(arg);
  // let mnemonic = bip39.generateMnemonic();
  // console.log(mnemonic);
  let mnemonic = remnemonic;
  var encrytMnemonic = bip39.mnemonicToEntropy(mnemonic)
  console.log(encrytMnemonic);

  fs.writeFile(mnemonicpath, mnemonic, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('----------成功-------------');
  });

  fs.writeFile(eptionmcpath, encrytMnemonic, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('----------成功-------------');
  });
  let finalpsd = arg + encrytMnemonic;
  console.log(finalpsd);
  var hash = crypto.createHash('SHA256').update(finalpsd).digest('hex');
  fs.writeFile(hashpath, hash, err => {
    if (err) {
      console.log(err)
      return false
    }
    console.log('写入成功');
    pass1(arg);
    console.log(hash);
  })

  event.sender.send("tologin2")
})

ipcMain.on('Emnemonic', (event, PW) => {
  event.reply('Emnemonic', "导出助记符")

  fs.readFile(eptionmcpath, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(data.toString());
    var finalpsd = PW + data.toString();
    console.log(finalpsd);
    fs.readFile(hashpath, (err, data1) => {
      if (err) {
        console.log(err);
        return false;
      }
      var hash = crypto.createHash('SHA256').update(finalpsd).digest('hex');
      console.log(hash);
      console.log(data1.toString());
      if (hash == data1.toString()) {
        pass1(PW);
        event.sender.send("Emnemonic2", 0)
      } else {
        event.sender.send("Emnemonic2", 1)
      }
    })
  })

  // web3 = new Web3(new Web3.providers.HttpProvider(net));
  // var huanyuan = web3.eth.accounts.privateKeyToAccount(Pkey);
  // var Account = huanyuan.address
  // event.sender.send("import", Account);
  // importAccount(Pkey, Account);
})

ipcMain.on('printemnemonic', (event) => {
  event.reply('printemnemonic', "打印助记符")

  fs.readFile(mnemonicpath, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    var data2 = data.toString()
    console.log(data.toString());
    event.sender.send("Mnemonic2", data2);
  })
})

ipcMain.on('keystores', (event, keyse_1, keyse_2, net) => {
  event.reply('keystores', "json导入账户")
  web3 = new Web3(new Web3.providers.HttpProvider(net));
  var json = web3.eth.accounts.decrypt(keyse_1, keyse_2);
  var Account = json.address;
  var Pkey = json.privateKey;
  event.sender.send("importkeystores", Account);
  importAccount(Pkey, Account);
})

ipcMain.on('rset', (event, PW) => {
  event.reply('rset', "重置钱包")

  fs.readFile(eptionmcpath, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(data.toString());
    var finalpsd = PW + data.toString();
    console.log(finalpsd);
    fs.readFile(hashpath, (err, data1) => {
      if (err) {
        console.log(err);
        return false;
      }
      var hash = crypto.createHash('SHA256').update(finalpsd).digest('hex');
      console.log(hash);
      console.log(data1.toString());
      if (hash == data1.toString()) {
        pass1(PW);
        event.sender.send("reset2", 0)
      } else {
        event.sender.send("reset2", 1)
      }
    })
  })
})

ipcMain.on('reset3', (event) => {


  fs.writeFile(eptionmcpath, "", function (err) {
    if (err) {
      console.error(err);
    }
    console.log('----------覆盖成功-------------');
  });

  fs.writeFile(hashpath, "", function (err) {
    if (err) {
      console.error(err);
    }
    console.log('----------覆盖成功-------------');
  });

  fs.writeFile(mnemonicpath, "", function (err) {
    if (err) {
      console.error(err);
    }
    console.log('----------覆盖成功-------------');
  });

  fs.readFile(accountpath2, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();
    person = JSON.parse(person);


    var str = JSON.stringify(person);
    fs.writeFile(accountpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('----------覆盖成功-------------');
    })
  })

  fs.readFile(transactionpath2, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();
    person = JSON.parse(person);


    var str = JSON.stringify(person);
    fs.writeFile(transactionpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('----------覆盖成功-------------');
    })
  })

  createWindow("../html/register.html");
  //app.exit();
})

ipcMain.on('Cpass1', (event, PSW, PrK) => {
  event.reply('Cpass1', "验证密码")

  fs.readFile(eptionmcpath, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(data.toString());
    var finalpsd = PSW + data.toString();
    console.log(finalpsd);
    fs.readFile(hashpath, (err, data1) => {
      if (err) {
        console.log(err);
        return false;
      }
      var hash = crypto.createHash('SHA256').update(finalpsd).digest('hex');
      console.log(hash);
      console.log(data1.toString());
      if (hash == data1.toString()) {
        pass1(PSW);
        event.sender.send("Cpass2", 0, PrK)
      } else {
        event.sender.send("Cpass2", 1, PrK)
      }
    })
  })
})

ipcMain.on('Cpass3', (event, PrK) => {
  event.sender.send("Cpass4", PrK);
})

ipcMain.on('Cpass5', (event) => {
  event.sender.send("Cpass6");
})

ipcMain.on('complete', (hash, address, address1, value1, Price) => {
  var date = new Date();
  var nowTime = date.toLocaleString();
  jilu1(hash, address, address1, value1, Price, nowTime);
})

const jilu1 = async (hash, address, address1, value1, Price, nowTime) => {
  // console.log("交易hash:" + hash);
  // console.log("交易from:" + address);
  // console.log("交易to:" + address1);
  // console.log("交易value:" + value1);
  // console.log("交易price:" + Price);
  // console.log("交易date:" + nowTime);
  fs.readFile(transactionpath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var jiaoyi = data.toString();//将二进制的数据转换为字符串
    jiaoyi = JSON.parse(jiaoyi);
    for (i = 0; i < 1; i++) {
      var transaction = {
        id: ("交易" + jiaoyi.count),
        time: nowTime,
        Hash: address,
        from: address1,
        to: value1,
        value: Price,
        state: "成功",
      };
      jiaoyi.data.push(transaction);
      jiaoyi.count = jiaoyi.count + 1;
    }
    //分割线console.log("__________________________________________________________")
    //将字符串转换为json对象
    //将传来的对象push进数组对象中
    //定义一下总条数，为以后的分页打基础
    var str = JSON.stringify(jiaoyi);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(transactionpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('交易记录成功(成功)' + str);
    })
  })
}

ipcMain.on('fail', (address, address1, value1, Price) => {
  var date = new Date();
  var nowTime = date.toLocaleString();
  jilu2(address, address1, value1, Price, nowTime);
})

const jilu2 = async (address, address1, value1, Price, nowTime) => {
  // console.log("交易hash:");
  // console.log("交易from:" + address);
  // console.log("交易to:" + address1);
  // console.log("交易value:" + value1);
  // console.log("交易price:" + Price);
  // console.log("交易date:" + nowTime);
  fs.readFile(transactionpath, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var jiaoyi = data.toString();//将二进制的数据转换为字符串
    jiaoyi = JSON.parse(jiaoyi);
    for (i = 0; i < 1; i++) {
      var transaction = {
        id: ("交易" + jiaoyi.count),
        time: nowTime,
        Hash: "交易失败,无Hash",
        from: address1,
        to: value1,
        value: Price,
        state: "失败",
      };
      jiaoyi.data.push(transaction);
      jiaoyi.count = jiaoyi.count + 1;
    }
    //分割线console.log("__________________________________________________________")
    //将字符串转换为json对象
    //将传来的对象push进数组对象中
    //定义一下总条数，为以后的分页打基础
    var str = JSON.stringify(jiaoyi);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(transactionpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('交易记录成功(失败)' + str);
    })
  })
}


ipcMain.on('rtrance', (event, PW) => {
  event.reply('rtrance', "清空交易记录")

  fs.readFile(eptionmcpath, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(data.toString());
    var finalpsd = PW + data.toString();
    console.log(finalpsd);
    fs.readFile(hashpath, (err, data1) => {
      if (err) {
        console.log(err);
        return false;
      }
      var hash = crypto.createHash('SHA256').update(finalpsd).digest('hex');
      console.log(hash);
      console.log(data1.toString());
      if (hash == data1.toString()) {
        pass1(PW);
        event.sender.send("rtrance2", 0)
      } else {
        event.sender.send("rtrance2", 1)
      }
    })
  })
})

ipcMain.on('rtrance3', (event) => {

  fs.readFile(transactionpath2, function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();
    person = JSON.parse(person);


    var str = JSON.stringify(person);
    fs.writeFile(transactionpath, str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('----------清空成功-------------');
      event.sender.send("rtrance4")
    })
  })

})

ipcMain.on('Update', (event) => {
  var url = "http://192.168.164.1:4000/version";
  var request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      var tst = request.responseText;
      console.log(tst);
      const nowVersion = app.getVersion();
      if (nowVersion < tst) {
        event.sender.send("Update2", tst)
      } else {
        event.sender.send("Update4")
      }
    } else {
      event.sender.send("Update3")
    }
  }
})

ipcMain.on('Autoupdate', (event) => {
  var url = "http://192.168.164.1:4000/version";
  var request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      var tst = request.responseText;
      console.log(tst);
      const nowVersion = app.getVersion();
      if (nowVersion < tst) {
        event.sender.send("Autoupdate2", tst)
      } else {
      }
    } else {
      event.sender.send("Autoupdate3")
    }
  }
})

ipcMain.on('Update5', (event) => {

  var exe_src = 'http://192.168.164.1:4000/Eth Wallet 2.0.exe'; //获取图片的url
  var exe_filename = 'Eth Wallet 2.0.exe';
  var writerStream = fs.createWriteStream('./'+ exe_filename);
  //采用request模块，向服务器发起一次请求，获取图片资源
  request.head(exe_src, function (err, res, body) {
    if (err) {
      console.log(err);
    } else {
    }
  });

  var str = progress({
    time: 10
  });

  str.on('progress', function(progress) {
    console.log(Math.round(progress.percentage)+'%');
    var a = Math.round(progress.percentage) 
    event.sender.send("loads", Math.round(progress.percentage))
  });

  request(exe_src, { headers: { 'user-agent': 'test' }}).pipe(str).pipe(writerStream);

  
  // request(exe_src).pipe(writerStream);

  writerStream.on('finish', function() {
    console.log("下载完成");
    event.sender.send("install")
    
  });

  writerStream.on('error', function(err){
   console.log(err.stack);
  });


  // exec('./Eth Wallet 2.0.exe', function(err, data) {  
  //   console.log(err)
  //   console.log(data.toString());                       
  // })

  // var exe_filename = 'Eth Wallet 2.0.exe';
  // var request = new XMLHttpRequest();
  // request.open("get", exe_src);
  // request.send(null);
  // request.onload = function () {
  //   if (request.statusCode == 200) {
  //     request.setEncoding(null);
  //     var str = progress({
  //       length: request.headers['content-length'],
  //       time: 500 /* ms */
  //     });
  //     str.on('progress', function (progress) {
  //       var percentage = Math.round(progress.percentage)
  //       $(".progress-bar").css('width', percentage + "%");
  //       $(".percent").text(percentage + "%");
  //     });
  //     request.get(exe_src).pipe(str).pipe('./' + exe_filename);
  //   } else {
  //   }
  // }

  // child.exec(`${'../'+ exe_filename}`, (err, stdout, stderr) => {
  //   console.log(err, stdout, stderr)
  // })
  // var url = "http://192.168.164.1:4000/Accountfile/json/version2";
  // var request = new XMLHttpRequest();
  // request.open("get" ,url);
  // request.send(null);
  // request.onload = function(){
  //   if (request.status == 200){
  //     var tst = request.responseText;
  //     console.log(tst);
  //     fs.writeFile(versionpath2, tst, function (err) {
  //       if (err) {
  //         console.error(err);
  //       }
  //       console.log('版本更新成功');
  //     })
  //   }else{
  //     event.sender.send("Update3")
  //   }
  // }

})

ipcMain.on('exit', () => {
  app.exit();
})
// // 接收来自标识为asynchronous-message的消息
// ipcMain.on('asynchronous-message', function (event, arg) {

//   // 返回标识为asynchronous-reply的消息'pong'
//   event.sender.send('asynchronous-reply', 'pong')
// })
//3.提取私钥，公钥，账户
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// var subscription = web3.eth.subscribe('logs', {
//   address: '0x3De98d10731d60056fd52a302808eeeCd07e9DD7'
// }, function (error, result) {
//   console.log(result);
//   if (!error) {
//     console.log(log);
//   }
// });

// unsubscribes the subscription
// subscription.unsubscribe(function (error, success) {
//   if (success) {
//     console.log('Successfully unsubscribed!');
//   }
// });
// var subscription = web3.eth.subscribe('logs', {
//   address: '0x3De98d10731d60056fd52a302808eeeCd07e9DD7'
// }, function (error, result) {
//   if (!error)
//     console.log(result);
// })
//   .on("data", function (log) {
//     console.log(log);
//   })
//   .on("changed", function (log) {
//   });

// // unsubscribes the subscription
// subscription.unsubscribe(function (error, success) {
//   if (success)
//     console.log('Successfully unsubscribed!');
// });
