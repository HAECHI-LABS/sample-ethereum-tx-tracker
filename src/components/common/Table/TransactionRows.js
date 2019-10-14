import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function getEtherscanUrl(tx) {
    return `https://etherscan.io/tx/${tx.transactionHash}`
}

export default function ({transactions,page,rowsPerPage}) {
    return transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( (tx,index) => {
        return (
        <TableRow key={index}>
            <TableCell>
                <Button
                    href={getEtherscanUrl(tx)}
                    target="_blank"
                >
                    {tx.transactionHash}
                </Button>
            </TableCell>
            <TableCell>
                {tx.status}
            </TableCell>
            <TableCell> 
                <Typography>
                { tx.status === 'confirmation' ? tx.blockNumber: ""}
                </Typography>
            </TableCell>
        </TableRow>
        )
    })
}
