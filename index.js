const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const Henesis = require('@haechi-labs/henesis-sdk-js').default;
const { Sender } = require('./helper/Sender');

const transactions = {};
const henesis = new Henesis("a481485a958f1b82ac310ec4eea27943");

app.use(cors({
  allowedHeaders: ['Current-Page', 'Last-Page', 'Authorization'],
  exposedHeaders: ['Current-Page', 'Last-Page', 'Authorization'],
}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/tx', function(req,res) {
    res.json(transactions); 
});

app.post('/api/tx', async function(req,res) {
  const sender = new Sender('D2864C6ECEA17B8CC70C02214FF0785AE5B011FA071C642F800AF4D02C9E457A');
  const nonce = await sender.getNonce();
  const txHash = await sender.send(nonce);
  henesis.trackTransaction(txHash, {
    timeout: 6000, // If the transaction is not mined until the timeout, a pending message will be sent.
    confirmation: 5 // When a transaction is confirmed up to the corresponding block confirmation, a confirmation message will be sent.
  });
  transactions[txHash] = { status: "init" };
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
    console.log('message',message)
    switch(message.data.type) {
      case 'pending' : 
        transactions[message.data.result.transactionHash] = { status: 'pending'}
        break;
      case 'receipt' : 
        transactions[message.data.result.transactionHash] = { status: 'receipt'}
        // trackTransaction 함수 호출시 설정한 confirmation이 지나고 호출 됩니다.
        break;
      case 'confirmation' : 
        transactions[message.data.result.transactionHash] = { status: 'confirmation'}
        // transaction이 confirm 된 순간에 호출 됩니다.
        break;
    }
    message.ack();
  });
  subscription.on("error", async (error) => {
    console.log('err',error)
    // error handling	
  });
}

async function main () {
    trackTx()
    app.listen(3000);
}
main()
