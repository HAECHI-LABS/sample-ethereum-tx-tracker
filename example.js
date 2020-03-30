require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const {HenesisWeb3} = require('../henesis-sdk-js/packages/henesis-sdk-js');
const {TransactionStore} = require('./store/TransactionStore');
const {TransactionHelper} = require('./helper/TransactionHelper');
const {Transaction, Status} = require('./types/index');

const {PRIVATE_KEY, TN_ENDPOINT} = process.env;
const TIMEOUT = 10 * 1000;
const CONFIRMATION = 6;
const GAS_PRICE = 1000000000;

const web3 = new HenesisWeb3(TN_ENDPOINT);
const transactionHelper = new TransactionHelper(web3, PRIVATE_KEY);
const transactionStore = new TransactionStore();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/tx', function (req, res) {
  res.json(transactionStore.findAll());
});

app.post('/api/tx', async function (req, res) {
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

  const transaction = new Transaction(
    hash,
    nonce,
    GAS_PRICE
  );

  transactionStore.save(transaction);
  await res.json(transaction);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

async function trackTx() {
  const subscription = await web3.eth.subscribe('transaction', {
    subscriptionId: 'your-subscription-id',
    ackTimeout: 30 * 1000 // default is 10 * 1000 (ms)
  });

  subscription.on('message', async (message) => {
    const transactionHash = message.data.result.transactionHash;
    let transaction = {};
    console.log(`[MESSAGE] transaction ${transactionHash} status is: ${message.data.type}`);
    transaction = transactionStore.findByHash(transactionHash);
    if (transaction !== undefined) {
      switch (message.data.type) {
        case 'pending' :
          if (transaction.status === undefined) {
            transaction.status = Status.pending;
          }
          if (isNeededResolve(transaction)) {
            const newTransaction = await retry(transaction);
            transactionStore.save(newTransaction);
          }
          break;
        case 'receipt' :
          checkResolvedTransaction(transaction);
          transaction.status = Status.receipt;
          transaction.data = {...message.data.result};
          transactionStore.save(transaction);
          break;
        case 'confirmation' :
          transaction.status = Status.confirmation;
          transaction.data = {...message.data.result};
          transactionStore.save(transaction);
          break;
      }
    }
    message.ack();
  });

  subscription.on('error', async (error) => {
    console.log('err', error);
  });
}

function gasPriceUp(gasPrice, up) {
  let result = Number(gasPrice);
  result += Number(up);
  return result.toString();
}

function isNeededResolve(transaction) {
  const transactions = transactionStore.findAll();

  for (let tx of transactions) {
    if (tx.nonce == transaction.nonce && (tx.status == Status.receipt || tx.status == Status.confirmation)) {
      return false;
    }
  }
  return true;
}

async function retry(transaction) {
  const nonce = transaction.nonce;
  const gasPrice = transaction.gasPrice;
  const newGasPrice = gasPriceUp(gasPrice, '1000000000');
  const signedTransaction = await transactionHelper.getDefaultSignedTransaction(nonce, newGasPrice);
  const newTxHash = await web3.utils.sha3(signedTransaction);

  console.log(
    '[PENDING] try send tx with same nonce, higher gas price\n',
    'hash : ', newTxHash,
    'nonce : ', nonce,
    'gasPrice : ', newGasPrice
  );

  web3.eth.sendSignedTransaction(signedTransaction, {
    timeout: TIMEOUT, // default is 30 * 1000
    confirmation: CONFIRMATION // default is 6
  });

  const newTransaction = new Transaction(
    newTxHash,
    nonce,
    newGasPrice
  );

  return newTransaction;
}

function checkResolvedTransaction(transaction) {
  const transactions = transactionStore.findAll();

  transactions.forEach((tx) => {
    if (tx.nonce == transaction.nonce && tx.transactionHash != transaction.transactionHash) {
      tx.status = Status.replaced;
    }
  });
}

async function main() {
  await trackTx();
  app.listen(3000);
}

main();
