class Transaction {
  constructor(transactionHash, nonce, gasPrice, status) {
    this.transactionHash = transactionHash;
    this.nonce = nonce;
    this.gasPrice = gasPrice;
    this.status = status;
    this.data = {};
  }
}

const Status = Object.freeze({
  "pending": "pending",
  "receipt": "receipt",
  "confirmation": "confirmation",
  "replaced": "replaced"
});

module.exports = {Transaction, Status};
