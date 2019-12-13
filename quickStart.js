require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const { Sender } = require('./helper/Sender');
const {TransactionTracker} = require('@haechi-labs/henesis-sdk-js');
const {Transaction, Status} = require('./types/index');

const transactions = {};

const {CLIENT_ID, PRIVATE_KEY, NODE_ENDPOINT, PLATFORM, NETWORK} = process.env;
const TIMEOUT = 30*1000;
const CONFIRMATION = 6;
const GAS_PRICE = 1000000000;

const tracker = new TransactionTracker(CLIENT_ID, {
  platform: PLATFORM,
  network: NETWORK
});

const sender = new Sender(PRIVATE_KEY, NODE_ENDPOINT);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/tx', function(req,res) {
  res.json(Object.entries(transactions).map(item => {
    return {
      transactionHash: item[0],
      status: item[1].status,
      nonce: parseInt(item[1].nonce, 16),
      data: item[1]
    }
  }));
});

app.post('/api/tx', async function(req,res) {
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

  res.json(transaction);
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

async function trackTx () {
  const subscription = await tracker.subscribe(
    'transaction',
    {
      subscriptionId: 'your-subscription-id',
      ackTimeout: 30 * 1000 // default is 10 * 1000 (ms)
    }
  );

  subscription.on('message', async (message) => {
    console.log(`now transaction status is: ${message.data.type}`);
    switch(message.data.type) {
      case 'pending' :
        transactions[message.data.result.transactionHash] = { status: Status.pending};
        break;
      case 'receipt' :
        console.log('message.data.result',message.data.result);
        transactions[message.data.result.transactionHash] = { ...message.data.result, status: Status.receipt }
        break;
      case 'confirmation' :
        console.log('message.data.result',message.data.result);
        transactions[message.data.result.transactionHash] = {...message.data.result, status: Status.confirmation }
        break;
    }
    message.ack();
  });

  subscription.on('error', async (error) => {
    console.log('err',error)
  });
}

async function main () {
  trackTx();
  app.listen(3000);
}

main();
