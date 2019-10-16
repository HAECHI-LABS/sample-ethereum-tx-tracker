import React from 'react';
import Button from '@material-ui/core/Button';
import {generateTransaction} from '../lib/api/transactions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(1, 1),
      margin: theme.spacing(1, 4)
    },
  }));
  
export default () => {
    const classes = useStyles();
    return <Button className={classes.root} variant="contained" color="primary" onClick={async () => { await generateTransaction() }}> Generate a Transaction!</Button>
}
