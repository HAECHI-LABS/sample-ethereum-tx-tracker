import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CustomChip from './CustomChip';
import Button from '@material-ui/core/Button';

function getEtherscanUrl(event) {
    return `https://etherscan.io/tx/${event.transactionHash}`
}

function describeEvent(event) {
    function argSpreader(args) {
        return Object.entries(args).map( arg => {
            return <CustomChip arg={arg} />
        })
    }
    return argSpreader(event.args)
}

export default function ({events,page,rowsPerPage}) {
    return events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( (event,index) => {
        return (
        <TableRow key={index}>
            <TableCell>
                <Button
                    href={getEtherscanUrl(event)}
                    target="_blank"
                >
                    {event.event}
                </Button>
            </TableCell>
            <TableCell>
                {describeEvent(event)}
            </TableCell>
            <TableCell> 
                {event.blockMeta.blockNumber}
            </TableCell>
        </TableRow>
        )
    })
}
