/*********************************************************************************
 *********************************************************************************
 *
 * GXVC Token Swapper
 * Javascript Front-End
 *
 *********************************************************************************
 ********************************************************************************/

// Enforce JavaScript 1.8.5 (ECMAScript version 5
'use strict';


/*********************************************************************************
 *
 * Data - Functions
 *
 *********************************************************************************/

function hex2a(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    var v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
}


/*********************************************************************************
 *
 * Page Initialization
 *
 *********************************************************************************/

var Web3;             // web3 library
//var web3;             // web3 provider
var contractInstance; // handle to contract
var oldTokInstance;

 /*********************************************************************************
 *
 * Page Initialization
 *
 *********************************************************************************/

//get contract abstraction
 //import '../../build/contracts/Swap.json';
        
//$(document).ready(function () {
window.addEventListener('load', function() {

    // connect with provider
    Web3 = require('web3');


 if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    window.Metamask = true;
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.Metamask = false;
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }


// Old Token
var OldTokAdd = '0x58ca3065c0f24c7c96aee8d6056b5b5decf9c2f8';    // Real old token
//var OldTokAdd = '0xE5a5B67ADa8e705A48646C7639782Eb1E284a76d';
var OldTokAbiString = '[{"constant":true,"inputs":[],"name":"crowdSaleAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"initialSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newCrowdSaleAddress","type":"address"}],"name":"restCrowdSaleAddress","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalMigrated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_member","type":"address"},{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unlock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"locked","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"lock","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_crowdSaleAddress","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]';
var OldTokAbi = JSON.parse(OldTokAbiString);
oldTokInstance = web3.eth.contract(OldTokAbi).at(OldTokAdd);

// Swapper
var SwapAddress = '0x306E5D0C7b3934AF9BDb57C3Ef0Eb886982C2aEE';
var SwapAbiString = '[{"constant":false,"inputs":[],"name":"flushEthers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_value","type":"uint256"},{"name":"_hash","type":"bytes32"}],"name":"makeSwap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"updateOldToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"}],"name":"updateEthRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"removeAuthorized","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"flushTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"}],"name":"updateTokenRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"addAuthorized","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pauseSwap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"resumeSwap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_spender","type":"address"}],"name":"updateNewToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"EtherReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"GXVCSentByEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_address","type":"address"}],"name":"GXVCReplay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_address","type":"address"}],"name":"GXVCNoToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"TokensReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"GXVCSentByToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"}],"name":"SwapPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"}],"name":"SwapResumed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_rate","type":"uint256"}],"name":"EtherrateUpd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_n","type":"uint256"},{"indexed":false,"name":"_rate","type":"uint256"}],"name":"TokenrateUpd","type":"event"}]';
var SwapAbi = JSON.parse(SwapAbiString);
contractInstance = web3.eth.contract(SwapAbi).at(SwapAddress);


followContract.setAttribute('href','https://rinkeby.etherscan.io/address/' + SwapAddress);

// -------- System info

setTimeout(function(){
    var coinbase = web3.eth.coinbase;
    document.getElementById('coinbase').innerText = coinbase;
  
  //if ( !Metamask ) {

    var coinbaseBalanceETH = web3.eth.getBalance(coinbase , function(error, result){
    if(!error) {
        console.log(result);
    document.getElementById('coinbaseBalance').innerText = web3.fromWei(result);
    }
    else
        console.error(error);
});
 //  }
    },800);

 // -----------------

var lb = contractInstance.lastBlock.call(function(error,lastBlock){
  if (!error) {


    document.getElementById('swapStatus').innerHTML = "Swapper working OK";

    //if ( lastBlock == 0 ) lastBlock = 'latest';

    oldTokInstance.Transfer({},{ fromBlock: lastBlock , toBlock: 'latest' }).watch( (error, result) => {

          if( !error && result.args.to == SwapAddress.toLowerCase() ) {
              var _value = result.args.value;
              var _from = result.args.from;
              var _hash = result.transactionHash;
              document.getElementById('responses').innerHTML += "<b>" + web3.fromWei(_value) + " token received<br>From address: <b>" + _from + "</b><br>Hash: " + _hash + "<br><br>";
              SwapFrontEnd.makeSwap ( _from , _value , _hash); 
            }

          else {
              if (error) console.error(error);
            }
      }); // Closes oldtokinstance

  } // Close if error from lastBlock
else {

  document.getElementById('swapStatus').innerHTML = "Error loading";
}

  }); // Close lastblock


});



/*********************************************************************************
 *
 * Contract Interaction - Transactions
 *
 *********************************************************************************/

window.SwapFrontEnd = {

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  makeSwap : function(_to , _value , _hash) {
    console.log( "make Swap. to: "+ _to );
    contractInstance.makeSwap(_to, _value , _hash ,
                           {gas:500000, from:web3.eth.accounts[0]},
                           function(error, result){
    if(!error) {
        console.log(result);
		document.getElementById('responses').innerHTML += "<b>Swap made to: "+ _to + "</b><br><br>";

	}
    else {
            console.error(error);
        }
});
  },

  updateOldToken : function(_address ) {
    console.log( "Update old token to: "+ _address );
    contractInstance.updateOldToken(_address,
                           {gas:500000, from:web3.eth.accounts[0]},
                           function(error, result){
    if(!error) {
        console.log(result);
      document.getElementById('responses').innerHTML += "<b>Updated old token to: "+ _address + "</b><br><br>";

  }
    else {
            console.error(error);
        }
});
  },


  updateNewToken : function(_address , _spender) {
    console.log( "Update new token to: "+ _address + ". Spender: " + _spender);
    contractInstance.updateNewToken(_address , _spender,
                           {gas:500000, from:web3.eth.accounts[0]},
                           function(error, result){
    if(!error) {
        console.log(result);
      document.getElementById('responses').innerHTML += "<b>Updated new token to: "+ _address + ". Owner: " + _spender + "</b><br><br>";

  }
    else {
            console.error(error);
        }
});
  },


   flushEthers : function() {
    console.log( "Flushing Ethers" );
    contractInstance.flushEthers(
                       {gas:500000, from:web3.eth.accounts[0]},
                       function(error, result){
    if(!error) {
        console.log(result);

	}
    else {
            console.error(error);
        }
});
  },

}