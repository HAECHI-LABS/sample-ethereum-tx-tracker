import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function getEtherscanUrl(tx) {
    return `https://ropsten.etherscan.io/tx/${tx.transactionHash}`
}

function sliceTx(txHash) {
    return `${txHash.slice(0,8)}...`;
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
                    {sliceTx(tx.transactionHash)}
                </Button>
            </TableCell>
            <TableCell>
                {tx.status}
            </TableCell>
            <TableCell>
                { tx.nonce? tx.nonce : ""}
            </TableCell>
            <TableCell>
                { tx.data? tx.data.blockNumber : ""}
            </TableCell>
            <TableCell>
                { tx.data? tx.data.gasUsed : ""}
            </TableCell>
        </TableRow>
        )
    })
}
