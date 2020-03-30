require('dotenv').config();
const {TransactionHelper} = require('./helper/TransactionHelper');
const {HenesisWeb3} = require('../henesis-sdk-js/packages/henesis-sdk-js');

const {PRIVATE_KEY, TN_ENDPOINT} = process.env;
const TIMEOUT = 30 * 1000;
const CONFIRMATION = 3;
const GAS_PRICE = 1000000000;

const web3 = new HenesisWeb3(TN_ENDPOINT);
const transactionHelper = new TransactionHelper(web3, PRIVATE_KEY);

async function generateTx() {
  const nonce = await transactionHelper.getNonce();
  const signedTransaction = await transactionHelper.getDefaultSignedTransaction(nonce, GAS_PRICE);
  const hash = await web3.utils.sha3(signedTransaction);

  console.log(`send transaction ${hash} with nonce ${nonce}`);
  web3.eth.sendSignedTransaction(signedTransaction, {
    timeout: TIMEOUT, // default is 30 * 1000
    confirmation: CONFIRMATION // default is 6
  });

  /*
  you can use like below with default tracking option

  web3.eth.sendSignedTransaction(signedTransaction);
   */
}

async function trackTx() {
  const subscription = await web3.eth.subscribe('transaction', {
      subscriptionId: 'your-subscription-id',
      ackTimeout: 30 * 1000 // default is 10 * 1000 (ms)
    }
  );

  subscription.on('message', async (message) => {
    console.log(`now transaction status is: ${message.data.type}`);
    switch (message.data.type) {
      case 'pending' :
        // When a transaction is not mined within 'timeout', after the 'trackTransaction' function is called.
        console.log('message.data.result', message.data.result);
        break;
      case 'receipt' :
        // When a transaction is mined.
        console.log('message.data.result', message.data.result);
        break;
      case 'confirmation' :
        // When the number of 'confirmation` blocks created, after the transaction is mined.
        console.log('message.data.result', message.data.result);
        break;
    }
    message.ack();
  });

  subscription.on('error', async (error) => {
    console.log('err', error)
  });
}

async function main() {
  await trackTx();
  await generateTx();
}

main();
