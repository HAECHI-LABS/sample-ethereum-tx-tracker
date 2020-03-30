const {Transaction: Tx} = require('ethereumjs-tx');

class TransactionHelper {

  constructor(web3, privateKey) {
    this.privateKey = privateKey;
    this.web3 = web3;
    this.account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
  }

  async getNonce() {
    await this.web3.eth.getTransactionCount(address, 'pending');
  }

  getDefaultSignedTransaction(nonce, gasPrice) {
    const rawTx = {
      nonce: nonce,
      gasPrice: this.web3.utils.toHex(gasPrice),
      gasLimit: this.web3.utils.toHex('42000'),
      from: this.account.address,
      to: this.account.address,
      value: '0x0',
      data: '0x0'
    };

    return this._sign(rawTx);
  }

  _sign(rawTx) {
    const tx = new Tx(rawTx, {chain: 'ropsten'});
    tx.sign(Buffer.from(this.privateKey, 'hex'));

    const serializedTx = tx.serialize();
    const hexSerializedTx = '0x' + serializedTx.toString('hex');
    return hexSerializedTx;
  }
}

module.exports = {TransactionHelper: TransactionHelper};
