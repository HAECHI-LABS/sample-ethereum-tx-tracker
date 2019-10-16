require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const Henesis = require('@haechi-labs/henesis-sdk-js').default;
const { Sender } = require('./helper/Sender');

const transactions = {};

const { CLIENT_ID, PRIVATE_KEY, NODE_ENDPOINT } = process.env;
const henesis = new Henesis(CLIENT_ID);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/tx', function(req,res) {
    res.json( Object.entries(transactions).map( item => { return { ...item[1], transactionHash:item[0]} } ) ); 
});

app.post('/api/tx', async function(req,res) {

  //Generate Transactions
  const sender = new Sender(PRIVATE_KEY, NODE_ENDPOINT);
  const nonce = await sender.getNonce();
  const txHash = await sender.send(nonce);
  console.log(`transaction generated. txHash:${txHash}`);

  //start tracking transaction
  henesis.trackTransaction(txHash, {
    timeout: 30*1000, 
    confirmation: 5 
  });
  transactions[txHash] = { status: "registered" };
  res.json(transactions); 
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

async function trackTx () {
  const subscription = await henesis.subscribe(
    "transaction",
    {
      subscriptionId: "your-subscription-id"
    }
  );

  subscription.on("message", async (message) => {
    console.log(`now transaction status is: ${message.data.type}`)
    switch(message.data.type) {
      case 'pending' : 
        transactions[message.data.result.transactionHash] = { status: 'pending'}
        break;
      case 'receipt' : 
        console.log('message.data.result',message.data.result)
        transactions[message.data.result.transactionHash] = { ...message.data.result, status: 'receipt' }
        break;
      case 'confirmation' : 
        console.log('message.data.result',message.data.result)
        transactions[message.data.result.transactionHash] = {...message.data.result, status: 'confirmation' }
        break;
    }
    message.ack();
  });

  subscription.on("error", async (error) => {
    console.log('err',error)
  });
}

async function main () {
    trackTx()
    app.listen(3000);
}

main()
