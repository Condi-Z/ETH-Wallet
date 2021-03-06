# 以太坊中文钱包(ETH Chinese Wallet)
## 用户指南

[百度网盘下载地址](https://pan.baidu.com/s/1OKfip70tWRENAj5EMCOhfA)   提取码:1111

### 1.注册与登录

钱包会自动检测本地文件 , 若没使用过钱包 , 则会跳转至注册界面

![微信截图_20211217185552](https://s2.loli.net/2021/12/17/hHCGVmYwlybrEjt.png)

注册界面提供两种创建账户方式 , 直接新建账户或从其他钱包导入助记符恢复之前账户

当然都需要输入密码进行注册 ,**密码不能为空！ 并确保两次密码相同 , 且只能6~16个字符**

![微信截图_20211217185600](https://s2.loli.net/2021/12/17/f3a8MwtI2pmJ5y9.png)

若是选择直接创建钱包注册成功后会出现助记符 , **请务必记下助记符并妥善保管**(拥有助记符就代表拥有您的账号的**所有权利!!!**)

记下后点击完成注册按钮 , 软件会自动跳转至登录界面 , 与其他软件登录相同输入您正确的密码即可开始您的去中心化钱包之旅

![微信截图_20211217185612](https://s2.loli.net/2021/12/17/BSeloP7iXpv68fm.png)

### 2.资产界面

登录后首选会进入到资产界面 , 您的所有账户在任意链上的余额都可以在这里查看

![微信截图_20211217182521](https://s2.loli.net/2021/12/17/FTJh34uQfzUXxrB.png)

### 3.交易界面

在交易界面中能够选择交易的网络及交易的代币(若没在设置中添加代币则只有ETH可供交易)

目标地址为您的收款人账户地址 , 金额为转账ETH的数量 , **Price越高则交易处理速度越快**

**注意!!交易提交完成后无法取消 , 请确定好所有选项后提交交易**

![微信截图_20211217182803](https://s2.loli.net/2021/12/17/oR95Bf1HC4deKst.png)

### 4.记录界面

您钱包上的所有在**本地发起的交易**都会存储在此 , 若交易失败则不会产生hash.

![微信截图_20211217183306](https://s2.loli.net/2021/12/17/R64nDBaPKIC7rH8.png)

### 5.设置界面

#### 	1.代币设置

可在此添加代币 , 需要代币符号和代币部署的合约地址**(若添加失败请检测网络是否选择正确!)**

添加成功则会在代币列表中显示

![微信截图_20211217183526](https://s2.loli.net/2021/12/17/S1Kz8hAi9VreInd.png)

#### 	2.网络设置

您可以在此处添加网络 ![微信截图_20211217184533](https://s2.loli.net/2021/12/17/HQWhavJDirLEgPm.png)

#### 	3.账户设置

您可以创建新账户或者通过密钥 , json文件导入账户 . 并可以显示当前账户二维码 , 供移动端钱包转账使用(二维码需要切换到二维码界面再点击二维码按钮即可显示)

并且 也可以显示密钥 , 点击密钥弹出密码框输入正确密码即可查看所选账户密钥 , 

**删除账户只可删除导入账户!!**

![微信截图_20211217185053](https://s2.loli.net/2021/12/17/9dGEBsv5RkDH2WC.png)

#### 	4.安全设置

安全里可以显示当前钱包助记符

清空交易记录及重置钱包

重置后无法恢复 , 请确认后操作

![微信截图_20211217185322](https://s2.loli.net/2021/12/17/srgC83yxcUvHdlI.png)

#### 	5.关于

关于里是钱包更新 , 可查看当前版本并检测服务器上是否有更新的版本 , 软件也具备自动检测功能 , 在登录时会检测版本若有新版本则会提示更新. 

![微信截图_20211217185458](https://s2.loli.net/2021/12/17/tAo3ShO6vs5emjc.png)

### 6.应用界面

应用界面是提供给开发者使用 , 导入部署在链上的Dapp , 并将Dapp上的方法在钱包中运行的界面 . 

现在任处于测试阶段 , 仅能实现写死的HelloWorld应用功能 . 

![微信截图_20211217203836](https://s2.loli.net/2021/12/17/iIHgsltzBMhu6AJ.png)

## 开发者指南

### 1.前言

基于现在市面上没有全中文的以太坊钱包,类似metamask的chrome插件需要科学上网才能下载,对于非专业人士而言略显困难,出于科研的目的开发出以太坊中文钱包,供大家使用.

**以下为项目说明,供开发人员或计算机专业相关人员调试使用,其他人员可直接下载exe文件进行安装使用**

**项目为开源项目 , 仅供学习,科研使用 , 禁止一切盈利行为 , 首发 , 其他版本皆为盗版!!!!**

### 2.项目文件说明

本钱包项目基于electron框架,以及web3js,nodejs,html等语言进行开发.

Accountfile文件夹中存放当前钱包中的账户信息,网络信息及代币详情.

html为项目前端的可视界面,js为项目后端,通过electron的[ipc渲染器](https://cloud.tencent.com/developer/section/1116208)与src文件夹中的index.js进行数据间的传输.

### 3.使用方法

ps:使用过程中需下载相对应的node模块进行安装,因GitHub上传问题就不讲node_modules文件夹打包,需要安装的依赖,及指令将放在下面进行介绍.

**<u>警告!!!   运行文件前请删除Accountfile下三个txt文件内容,确保文件内容为空!!!**</u>

1. 首先先将整个项目文件下载至本地,通过VSCode等编辑器软件打开(一下步骤统一使用VSCode进行演示)![微信截图_20211211141755](https://s2.loli.net/2021/12/11/6OxMEgYupLai8WG.png)

2. 在终端中开启新的终端,确保在项目根目录下运行一下代码

   ```nodejs
   npm start
   ```

3. 若没有报错(若报错一般为node包为安装),请稍等片刻直到出现一下界面表示钱包项目正常启动

![微信截图_20211211142201](https://s2.loli.net/2021/12/11/jCPVcgRX1mwMxDN.png)

4.报错看这里,报错为没有node_modules文件夹,直接运行

```
npm insatll
```

等待安装完成再次运行

```
npm start
```

就可正常启动程序

### 4.打包方法

**<u>警告!!!   打包前请将html , js , index.js 文件中的路径更改为打包路径!!!!!  (此处仅放两个重要文件的打包路径 , 其他文件中也有需要更改的路径)**</u>

![微信截图_20211211144421](https://s2.loli.net/2021/12/11/DjWHvef1rcdO8qg.png)

![微信截图_20211211145355](https://s2.loli.net/2021/12/11/NHMuazZphLeCUfw.png)

![微信截图_20211211175159](https://s2.loli.net/2021/12/11/Y8eNbWuzhVdEDPO.png)

打包依赖electron-packager方法,首先确保已安装该模块

```
npm install electron-packager -g
```

安装完成后运行一下代码

```
electron-packager . 'ETH Wallet' --platform=win32 --arch=x64 --ignore=./Accountfile --extra-resource=./Accountfile --out=./out --asar --app-version=15.1.2
```

各个参数介绍：

```
'ETH Wallet' ：你将要生成的exe文件的名称
```

--platform=win32 参数为打包成那种系统程序可选参数为:

```
linux
mas
win32
```

其他参数:

```
--arch=x64：决定了使用 x86 还是 x64 还是两个架构都用
--icon=computer.ico：自定义设置应用图标
--out=./out：指定打包文件输出的文件夹位置,当前指定的为项目目录下的out文件夹
--asar：打包之后应用的源码会以.asar格式存在(推荐使用该参数对文件进行加密)
--overwrite：覆盖原有的build,让新生成的包覆盖原来的包
--ignore=node_modules：如果加上该参数，项目里node_modules模块不会被打包进去
```

打包完成后在项目根目录下出现out文件夹,文件夹中内容为打包完成的exe文件

### 5.exe安装包

通过NSIS,将项目从文件夹打包成exe安装包文件,再次就不再多做介绍,直接放[链接](https://www.cnblogs.com/luzhanshi/p/11046260.html).

### 6.通过服务器进行软件升级

注意!!update文件夹中无2.0.exe安装包,需要自取[百度云链接](https://pan.baidu.com/s/1Mu5nC5yuGoKxEcOhDa-evA)  , 提取码:1111

1. 首先将update文件夹另开一个cmd终端

2. 安装本地服务器

   ```
   npm i -g http-server
   ```

3. 运行一下代码开启服务器

   ```
   http-server -p 4000
   ```

4. 在index.js中将url改为本地服务器端口![微信截图_20211211145820](https://s2.loli.net/2021/12/11/DKigIGnbXLj2Pvc.png)

5. version文件中为服务器上的版本号,应与服务器上exe安装文件版本号对应

6. 版本号可在package.json及package-lock.json文件中更改![微信截图_20211211150002](https://s2.loli.net/2021/12/11/Hbgdkvw4iCrjM5Q.png)![微信截图_20211211150011](https://s2.loli.net/2021/12/11/XCSUoY1TQWza3qF.png)

7. 若需要更新在开启程序时会提示更新并可以在设置中进行更新![微信截图_20211211150408](https://s2.loli.net/2021/12/11/xPSwYB4Omrd9fJH.png)![微信截图_20211211150418](https://s2.loli.net/2021/12/11/bCoJirWcSvn7ste.png)

8. 更新完成后会自动打开exe文件.更新完成后版本应为服务器上对应版本![微信截图_20211211150629](https://s2.loli.net/2021/12/11/bltzPW3TmoNw6kA.png)

### 7.在Linux上运行

1. 首先将程序打包成linux运行程序

2. ```
   electron-packager . 'ETH Wallet' --platform=linux --arch=x64 --ignore=./Accountfile --extra-resource=./Accountfile --out=./out --asar --app-version=15.1.2 --electron-zip-dir=./electron-zip
   ```

3. 一下为在kali上的运行演示 , 将文件导入linux系统中![微信截图_20211211154459](https://s2.loli.net/2021/12/11/7yINwxtUO3olemJ.png)

4. 右键在终端中打开,输入

   ```
   chmod 7777 ./ETHWallet
   在linux上运行  chmod 7777 ./electron (文件名)注意文件名中间不能加空格
   ```

5. ```
   ./ETHWallet --no-sandbox
   ```

   运行,一定要加[sandbox](https://blog.csdn.net/qq_39324871/article/details/108535892) , 未授权应用 , 也可以通过[授权应用](https://blog.csdn.net/qq_39324871/article/details/108535892)不用sandbox![微信截图_20211211155008](https://s2.loli.net/2021/12/11/5nS8PGMjwuYlTHh.png)

   程序运行截图:![微信截图_20211211155042](https://s2.loli.net/2021/12/11/kPyQ9HUi7YoegtJ.png)

### 8.安全

在设置-安全中输入当前钱包密码可重置钱包及交易记录,并可以查看当前账户的助记符

**<u>警告!!!   钱包重置后无法恢复,将删除所有账户信息,请提前记好助记符!!!!!**</u>

### 9.DPAA应用功能

可将以太坊上任何链编辑的智能合约与钱包进行交互,需要提供合约abi , 并可以调用合约上的方法 , 当前仅实现Demo,后续随缘开发.

### 10.安装包文件使用

上传问题,安装包文件压缩成7个小文件推荐使用[BandZip](http://www.bandisoft.com/)解压,解压完成后直接进行安装即可.

ps:测试更新文件ETH Wallet2.0.exe 同理



