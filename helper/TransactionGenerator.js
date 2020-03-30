const {Transaction: Tx} = require('ethereumjs-tx');

class TransactionGenerator {

  constructor(web3) {
    this.web3 = web3;
  }

  _sign(rawTx) {
    const tx = new Tx(rawTx, {chain: 'ropsten'});
    const privateKeyWithoutHexPrefix = this.web3.eth.accounts.wallet[0].privateKey.substr(2);
    tx.sign(Buffer.from(privateKeyWithoutHexPrefix, 'hex'));

    const serializedTx = tx.serialize();
    const hexSerializedTx = '0x' + serializedTx.toString('hex');
    return hexSerializedTx;
  }

  getDefaultSignedTransaction(nonce, gasPrice) {
    const rawTx = {
      nonce: nonce,
      gasPrice: this.web3.utils.toHex(gasPrice),
      gasLimit: this.web3.utils.toHex('42000'),
      from: this.web3.eth.accounts.wallet[0].address,
      to: this.web3.eth.accounts.wallet[0].address,
      value: '0x0',
      data: '0x0'
    };

    return this._sign(rawTx);
  }
}

module.exports = {TransactionGenerator: TransactionGenerator};
