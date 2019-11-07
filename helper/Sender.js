const { Transaction:Tx } = require('ethereumjs-tx');
const Web3 = require('web3');

class Sender {

    constructor(privateKey, nodeEndpoint) {
        this.privateKey = privateKey;
        this.web3 = new Web3(nodeEndpoint);
        this.account = this.web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    }

    async getNonce() {
        return await this.web3.eth.getTransactionCount(this.account.address, "pending");
    }

    async send(nonce, gasPrice) {
        let rawTx = {
            nonce: nonce,
            gasPrice: this.web3.utils.toHex(gasPrice),
            gasLimit: this.web3.utils.toHex('42000'),
            from: this.account.address,
            to: this.account.address,
            value: '0x1',
            data: '0x0'
        };
        const tx = new Tx(rawTx, {chain: 'ropsten'});
        tx.sign(Buffer.from(this.privateKey, 'hex'));

        const serializedTx = tx.serialize();

        return new Promise((resolve, reject) => {
            const hexSerializedTx = '0x' + serializedTx.toString('hex');
            this.web3.eth.sendSignedTransaction(hexSerializedTx, async (error, txHash) => {
                const hash = await this.web3.utils.sha3(hexSerializedTx);
                return resolve(hash);
            });
        });
    }
}
module.exports = { Sender };
