import { providers, Contract } from 'ethers';

if(!window.ethereum) {
    alert('No metamask found');
} else {
    const DEFAULT_TOKEN_ADDS = {
        "0x13881": {
            name:"matic test",
            contract: "0xB2E674F91130ceF37095039B1A76D4bB9Bd0e8bB"
        },
        "0x3": {
            name:"ropsten",
            contract: "0x00e6fd5b2c0c48e4c88c29c3476f7c5fbeeae400"
        },
        "0x89": {
            name:"matic",
            contract: "0xB2E674F91130ceF37095039B1A76D4bB9Bd0e8bB"
        },
        "0x4": {
            name:"rinkeby"
        },
        "0x5": {
            name: "goerli"
        },
        "0x1": {
            name:"ethereum"
        }
    };
    window.DTA = DEFAULT_TOKEN_ADDS;
    const chainId = ethereum.chainId in DEFAULT_TOKEN_ADDS ? ethereum.chainId : '0x13881';
    const contractAddress = window.CONTRACT_ADDRESS || DEFAULT_TOKEN_ADDS[chainId].contract;
    const contractABI = window.CONTRACT_ABI ? JSON.parse(window.CONTRACT_ABI) : [
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
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
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
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
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
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
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
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
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
        }
    ];
    const web3 = window.ethereum;
    const EthProvider = new providers.Web3Provider(window.ethereum);
    function createNonce() {
        const dict = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        let result = '';

        for (let i = 0; i < 12; i++) {
        const rand = Math.floor(Math.random() * 36);
        result += dict[rand];
        }

        return result;
    }

    const MMLib = {};
    
    window.MMLib = MMLib;
    
    MMLib.enabled = false;

    MMLib.init = function initLib() {
        
        if(MMLib.enabled) { return Promise.resolve(true); }
        else{
            web3.request({ method: 'eth_chainId' }).then((chainId) => {
                MMLib.chainName = chainId in DEFAULT_TOKEN_ADDS ? DEFAULT_TOKEN_ADDS[web3.chainId].name: null;
                console.error(chainId + ' - setting chainName to ' + MMLib.chainName);
            });
            
            web3.on('chainChanged', (chainId) => {
                //this should disable when chain is changed
                MMLib.chainName = chainId in DEFAULT_TOKEN_ADDS ? DEFAULT_TOKEN_ADDS[chainId].name: null;
                console.error(chainId + ' setting chainName to ' + MMLib.chainName);
              });
              
            return web3.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                //    window.provider = EthProvider;
                    MMLib.enabled = true;
                    MMLib.contractInstance = new Contract(contractAddress, contractABI,  EthProvider.getSigner());
                });
        }
       
    }

    MMLib.getSigningAccount = function getSigningAccount() {
        return web3.enable().then((accounts) => {
            console.log(accounts);
            alert('account detected is '+ accounts[0])
            return accounts[0];
        });
    }

    MMLib.signMessage = function signNonce(msg, account) {
        return new Promise((ful, rej) => {
            web3.sendAsync({
                method:'personal_sign',
                params:[msg, account],
                from:account,
                }, function (err, result) {
                if (err) {
                    console.error(err);
                    rej(err);
                } else {
                    ful(result);
                }
                })
        }); 
    }

    MMLib.recoverPublicAddress =  function recoverPublicAddress(message, signature) {
        return new Promise((ful, rej)=> {
            web3.sendAsync({
                method:'personal_ecRecover',
                params:[message,signature]
                }, function(err, result){
                    if (err) {
                        rej(err);
                    } else {
                        ful(result);
                    }
                });
        });
    }

    MMLib.login = function metalogin(acc) {
        const mesg = 'Login ' + createNonce();
        return MMLib.signMessage(mesg, acc).then((result) => {
            const signature = result.result;

            return MMLib.recoverPublicAddress(mesg, signature);
        }).then((result) => {
            const recvAddress = result.result;
            if(recvAddress === acc) {
                return true;
            } else {
                throw new Error('login failed');
            }
        });
    }

    MMLib.transferTokens = function transferTokens(to, value){
        
       return MMLib.contractInstance.transfer(to, value).then((result) => {
            console.log('transferToken' + result);
            alert('Total supply of token is '+ JSON.stringify(result.result));
            }).catch((err) => {
                console.error(err);
            });

    }

    MMLib.callContractFunction = function callCF(func, csv) {
        const args = csv.split(",");
        console.log(`calling function ${func} with args  ${JSON.stringify(args)}`)
        return MMLib.contractInstance[func].apply(MMLib.contractInstance, args).then((result) => {
            console.log(`function ${func} : ${result.result}`);
            return result;
        }).catch(err => {
            console.error(`function ${func} : ${csv}`, err);
            throw err;
        })

    }

    window.onload = function() {   
        //     let nonce = createNonce();
        MMLib.init();

    }
}
