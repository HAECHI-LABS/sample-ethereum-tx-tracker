import React from 'react';
import Button from '@material-ui/core/Button';
import {generateTransaction} from '../lib/api/transactions';

export default () => {
    return <Button onClick={async () => { await generateTransaction() }}> Generate Transaction!</Button>
}
