require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const {TransactionTracker} = require('@haechi-labs/henesis-sdk-js');
const {TransactionStore} = require('./store/TransactionStore');
const {Sender} = require('./helper/Sender');
const {Transaction, Status} = require('./types/index');

const {CLIENT_ID, PRIVATE_KEY, NODE_ENDPOINT, PLATFORM, NETWORK} = process.env;
const TIMEOUT = 10000;
const CONFIRMATION = 6;
const GAS_PRICE = 1000000000;

const tracker = new TransactionTracker(CLIENT_ID, {
  platform: PLATFORM,
  network: NETWORK
});
const sender = new Sender(PRIVATE_KEY, NODE_ENDPOINT);
const transactionStore = new TransactionStore();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/tx', function (req, res) {
  res.json(transactionStore.findAll());
});

app.post('/api/tx', async function (req, res) {
  //Generate Transactions
  const nonce = await sender.getNonce();
  const transactionHash = await sender.send(nonce, GAS_PRICE);
  console.log(`transaction generated. txHash:${transactionHash}`);

  //start tracking transaction
  await tracker.trackTransaction(transactionHash, {
    timeout: TIMEOUT,
    confirmation: CONFIRMATION
  });

  const transaction = new Transaction(
    transactionHash,
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
  const subscription = await tracker.subscribe(
    "transaction",
    {
      subscriptionId: "your-subscription-id",
      ackTimeout: 30 * 1000 // default is 10 * 1000 (ms)
    }
  );

  subscription.on("message", async (message) => {
    const transactionHash = message.data.result.transactionHash;
    let transaction = {};
    console.log(`[MESSAGE] transaction ${transactionHash} status is: ${message.data.type}`)
    switch (message.data.type) {
      case 'pending' :
        transaction = transactionStore.findByHash(transactionHash);
        if (transaction.status == undefined) {
          transaction.status = Status.pending;
        }
        if (isNeededResolve(transaction)) {
          const newTransaction = await retry(transaction);
          transactionStore.save(newTransaction);
        }
        break;
      case 'receipt' :
        transaction = transactionStore.findByHash(transactionHash);
        checkResolvedTransaction(transaction);
        transaction.status = Status.receipt;
        transaction.data = {...message.data.result};
        transactionStore.save(transaction);
        break;
      case 'confirmation' :
        transaction = transactionStore.findByHash(transactionHash);
        transaction.status = Status.confirmation;
        transaction.data = {...message.data.result};
        transactionStore.save(transaction);
        break;
    }
    message.ack();
  });

  subscription.on("error", async (error) => {
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
  const newTxHash = await sender.send(
    nonce,
    newGasPrice
  );

  console.log(
    "[PENDING] try send tx with same nonce, higher gas price\n",
    "hash : ", newTxHash,
    "nonce : ", nonce,
    "gasPrice : ", newGasPrice
  );
  await tracker.trackTransaction(newTxHash, {
    timeout: Number(TIMEOUT),
    confirmation: Number(CONFIRMATION)
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
  trackTx();
  app.listen(3000);
}

main();
