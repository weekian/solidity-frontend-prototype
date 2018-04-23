var testnetContractAddress = "0xd410F200dA830e08741A9b3Af9eBeB8783720Ed4";
var web3js = undefined;
var contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Burn",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "initialSupply",
				"type": "uint256"
			},
			{
				"name": "tokenName",
				"type": "string"
			},
			{
				"name": "tokenSymbol",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var contract = undefined;

$( document ).ready(function() {

    // Listener to check if web3 is injected successfully by Web3
    $( window ).on('load', function() {
        console.log("Running windows event listener")
        if (typeof web3 !== 'undefined') {
            console.log("Web3 detected");
            web3js = new Web3(web3.currentProvider);
            contract = web3js.eth.contract(contractABI).at(testnetContractAddress);
        } else {
            alert("No web3 injected by MetaMask could be detected")
        }
    })

    $('#button').click(function(){
        var recipientAddress =  $('#address').val();
        var amount = $('#amount').val();
        if (typeof amount === 'string') {
            amount = parseInt(amount);
        }
        if (web3js !== undefined) {
            console.log("Triggering transactions using account address: " + web3js.eth.defaultAccount + " and recipient is " + recipientAddress + " and the amount is " + amount);
            contract.approve(recipientAddress, amount, function(error, result){
                console.log(JSON.stringify(error));
                console.log(JSON.stringify(result));
                if (!error) {
                    alert(JSON.stringify(result));
                } else {
                    alert(JSON.stringify(error));
                }
            });
            alert("Contract method triggered");
        } else {
            alert("No web3 injected by MetaMask could be detected. Please wait a while more or check if MetaMask is installed");
        }
    })

    $('#send_ether_button').click(function(){
        var recipientAddress =  $('#address').val();
        var amount = $('#amount').val();
        if (typeof amount === 'string') {
            amount = parseInt(amount);
        }
        if (web3js !== undefined) {
            console.log("Triggering transfer: " + web3js.eth.defaultAccount + " and recipient is " + recipientAddress + " and the amount is " + amount);
            web3js.eth.sendTransaction({
                to: recipientAddress,
                value: amount,
                gas: 232575,
                gasPrice: 4000000000
            }, function(error, result) {
                console.log(JSON.stringify(error));
                console.log(JSON.stringify(result));
                if (!error) {
                    alert(JSON.stringify(result));
                } else {
                    alert(JSON.stringify(error));
                }
            })
            alert("send transaction triggered");
        } else {
            alert("No web3 injected by MetaMask could be detected. Please wait a while more or check if MetaMask is installed");
        }
    })
})

// CONTRACT OWNER: 0x66AF0cF0F86446A5b17f652CDB7fA3710Dc68Ad5
// NEW USER: 0x0609060a5b28938451004B5b4CBCf6A9368F2D4b
// EMPTY USER: 0x2be0E96f2F47202Da620C8fb3F8DB361DDBA6A28