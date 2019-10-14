import React from 'react';
import PropTypes from 'prop-types';
import TableMaterial from './Table.material';

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  onClickRow: PropTypes.func,
};

function Table({ columns, data, page, lastPage,
                 rowsPerPage = 10, onChangePage, onClickRow = () => {} }) {
  return (
    <TableMaterial
      columns={columns}
      data={data}
      page={page}
      lastPage={lastPage}
      rowsPerPage={rowsPerPage}
      onChangePage={onChangePage}
      onClickRow={onClickRow}
    />
  );
}

export default Table;
