
const Web3 = require("web3");
const MyContract = require("./build/contracts/Signature.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
require('dotenv').config()

mnemonic = process.env.MNEMONICS
rpcEndpoint = process.env.RPCENDPOINT

const provider = new HDWalletProvider(
mnemonic,
rpcEndpoint  );

const web3 = new Web3(provider);

const Contract = new web3.eth.Contract(
    MyContract.abi,
    "0xaaf2d663B0B153a29ecf47d01bF40918c9759Eb8"
  );

  readline.question('What is your first name  ', async (firstName)  => {

    readline.question('what is your last name  ', async (secondName)  => {

    var concatinatedHash = await Contract.methods.messageHash( firstName,secondName).call({});  


    console.log("concatinated Hash ========> ",concatinatedHash)
    
    var accounts = await web3.eth.getAccounts()

   var signedMessages = await web3.eth.sign(concatinatedHash,accounts[0]);
   console.log("signed Message ====> ",signedMessages)

   var signerRecovery = await Contract.methods.recoverSigner(concatinatedHash,signedMessages).call({});
   console.log("Signer =====>",signerRecovery)
   readline.close()
})});
