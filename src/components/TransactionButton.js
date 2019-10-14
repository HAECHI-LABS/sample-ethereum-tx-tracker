import Button from './common/Button';
import transactions from '../lib/api/transactions';

export default () => {
    return <Button onClick={transactions.generateTransaction()} />
}
