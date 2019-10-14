const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const Henesis = require('@haechi-labs/henesis-sdk-js').default;
const { Sender } = require('./helper/Sender');

const transactions = {};

const CLIENT_ID="a481485a958f1b82ac310ec4eea27943";
const PRIVATE_KEY='D2864C6ECEA17B8CC70C02214FF0785AE5B011FA071C642F800AF4D02C9E457A';
const henesis = new Henesis("a481485a958f1b82ac310ec4eea27943");

app.use(cors({
  allowedHeaders: ['Current-Page', 'Last-Page', 'Authorization'],
  exposedHeaders: ['Current-Page', 'Last-Page', 'Authorization'],
}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/tx', function(req,res) {
    res.json( Object.entries(transactions).map( item => { return { ...item[1], transactionHash:item[0]} } ) ); 
});

app.post('/api/tx', async function(req,res) {
  const sender = new Sender(PRIVATE_KEY);
  const nonce = await sender.getNonce();
  const txHash = await sender.send(nonce);
  henesis.trackTransaction(txHash, {
    timeout: 6000, 
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
    console.log(message)
    switch(message.data.type) {
      case 'pending' : 
        transactions[message.data.result.transactionHash] = { status: 'pending'}
        break;
      case 'receipt' : 
        transactions[message.data.result.transactionHash] = { status: 'receipt'}
        break;
      case 'confirmation' : 
        console.log('message.data',message.data)
        transactions[message.data.result.transactionHash] = { status: 'confirmation', blockNumber: message.data.result.blockNumber }
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
