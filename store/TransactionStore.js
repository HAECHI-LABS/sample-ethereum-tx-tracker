class TransactionStore {
  constructor() {
    this.store = new Map(); // key : transactionHash, value: transaction
  }

  findByHash(transactionHash) {
    return this.store.get(transactionHash);
  }

  findAll() {
    return [...this.store.values()];
  }

  save(transaction) {
    return this.store.set(transaction.transactionHash, transaction);
  }

  deleteByHash(transactionHash) {
    return this.store.delete(transactionHash);
  }
}

module.exports = { TransactionStore };
