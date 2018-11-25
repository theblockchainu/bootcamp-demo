var Web3 = require('web3');


var web3 = new Web3(window.web3.currentProvider);

const address = '0x98e0B975D0e3CCC8aE0F7fa6CD8ebA32A4359430';

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "totalClicks",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x15e62b91"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "addClick",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd340cce2"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "removeClick",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa05e48af"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_text",
        "type": "bytes32"
      }
    ],
    "name": "addText",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xb815e6cd"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getText",
    "outputs": [
      {
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe00fe2eb"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getClicks",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf58c5a67"
  }
];

var contract = web3.eth.contract(abi);

var openLab = contract.at(address);


var addClick = () => {
  openLab.addClick({ from: web3.eth.accounts[0] }, (err, res) => {
    if (err) {
      console.log('err ' + err);
    } else {
      console.log('res ' + res);
      setClicks();
      setStatus(res);
    }
  })
}


var removeClick = () => {
  openLab.removeClick({ from: web3.eth.accounts[0] }, (err, res) => {
    if (err) {
      console.log('err ' + err);
    } else {
      console.log('res ' + res);
      setClicks();
      setStatus(res);
    }
  })
}


var setClicks = function () {

  openLab.getClicks.call(function (e, r) {
    const status = document.getElementById('clicks')
    status.innerHTML = r.c[0];
  });
}

var setStatus = function (transactionId) {

  console.log('transactionId ' + transactionId);


  web3.eth.getTransaction(transactionId, function (e, r) {
    const status = document.getElementById('transaction');
    status.innerHTML = JSON.stringify(r, undefined, 2);
    getGasCost(r.gas);
  });

  web3.eth.getTransactionReceipt(transactionId, function (e, r) {
    const status = document.getElementById('receipt');
    status.innerHTML = JSON.stringify(r, undefined, 2);
  });
}

getGasCost = function (gasAmount) {
  var gasCost = 0.0001511165702900000; //INR
  var totalcost = gasCost * gasAmount;
  const status = document.getElementById('cost');
  status.innerHTML = totalcost;
}

setClicks();
