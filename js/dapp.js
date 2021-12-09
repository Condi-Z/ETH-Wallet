let { ipcRenderer } = require('electron');
const Web3 = require('web3');

function dapp(net, address){
const web3 = new Web3(net)
console.log("网络:" + net);
console.log("当前操作账号:" + address)

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getMassage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "setMassage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

var myContract = new web3.eth.Contract(abi,"0xaA714DD49911023419f5406a0C4705276C140180");
// Ropsten : 0xaA714DD49911023419f5406a0C4705276C140180
// Rinkeby : 0xB3BA065aE4724077A2a7345f3b1690F1DEE70a3D

// myContract.methods.getMassage().call().then(
//     function (params) {
//         console.log("getMassage",params)
//     }
// );

$("#getmessage").click(function () {
    myContract.methods.getMassage().call().then(
        function (params) {
            console.log("getMassage",params)
            document.getElementById("state1").innerHTML = params;
        }
    );
})

// $("#sendmessage").click(function () {
//     _message = $("#message").val();
//     console.log("message =>",_message);
    
//     myContract.methods.setMassage(_message).send({
//         from: address,
//         gas: 1500000,
//         gasPrice: "300000000"
//     })
//     .on("transactionhash",function (hash) {
//         console.log("transactionhash",hash)
//     })
//     .on("error",function (error,receipt) {
//         console.log("error",error)
//         console.log("receipt",receipt)
//     })
// })
}