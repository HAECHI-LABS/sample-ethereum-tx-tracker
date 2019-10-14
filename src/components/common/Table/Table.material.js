import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TransactionRows from './TransactionRows';

function TableHeaderMaterial({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell key={column.accessor}>
            {column.header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TableBodyMaterial({ data, columns, page, rowsPerPage }) {
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  return (
    <TableBody>
      <TransactionRows transactions={data.transactions} page={page} rowsPerPage={rowsPerPage} />
      {/*
              When last page item is less then items per page, then add space below them
            */}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}

    </TableBody>
  );
}

function TableFooterMaterial({ data, page, onChangePage, rowsPerPage }) {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={3}
          rowsPerPageOptions={[]}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            native: false,
          }}
          labelDisplayedRows={({ from, to, count }) => ``}
          onChangePage={onChangePage}
        />
      </TableRow>
    </TableFooter>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowY: 'auto',
  },
  table: {},
  tableWrapper: {},
}));

TableMaterial.propTypes = {
  columns: PropTypes.array.isRequired,
};

function TableMaterial({ columns, data, lastPage,
                         rowsPerPage, onClickRow }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const handleChangePage = ( event, page) => {
    if (page >= lastPage)
      return;
    setPage(page)
  }
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHeaderMaterial columns={columns}/>
          <TableBodyMaterial columns={columns} data={data} page={page}
                             rowsPerPage={rowsPerPage} />
          <TableFooterMaterial data={data} page={page}
                               rowsPerPage={rowsPerPage} onChangePage={handleChangePage} />
        </Table>
      </div>
    </Paper>
  );
}

export default TableMaterial;
