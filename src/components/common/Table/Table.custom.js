import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { useTable, useExpanded } from 'react-table';
import palette from '../../../lib/styles/custom/theme/palette';

const TableBlock = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    padding: 2rem;
    background: white;
    border-radius: 2px;
    table-layout: fixed;
    word-break: break-word;

    thead:after {
      content: '';
      display: block;
      height: 0.5em;
      width: 100%;
      background: white;
    }

    th {
      border: 0;
      text-align: left;
      white-space: normal; /* Only needed when it's set differntly somewhere else */
      word-wrap: break-word;
    }

    tbody:before {
      content: '';
      display: block;
      height: 0.5em;
      width: 100%;
      background: white;
    }

    tr {
      border-radius: 4px;
      :nth-child(even) {
        background: ${palette.gray[6]};
        color: white;

        td:first-child {
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
        td:last-child {
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        &:hover {
          background: ${palette.gray[7]};
        }
      }

      :nth-child(odd) {
        &:hover {
          background: ${palette.gray[1]};
        }
      }

      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    td {
      margin: 0;
      padding: 0.5rem;
      border: 0;
      white-space: normal; /* Only needed when it's set differntly somewhere else */
      word-wrap: break-word;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// TODO: need refactoring
function TableContent({ columns: userColumns, data, renderRowSubComponent, onClickRow }) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    flatColumns,
    // state: [{ expanded }],
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded, // We can useExpanded to track the expanded state
    // for sub components too!
  );

  // TODO: add key to each row, cell
  return (
    <table {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => {
        return (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        );
      })}
      </thead>
      <tbody>
      {rows.map(row => {
        return (
          prepareRow(row) || (
            // Use a React.Fragment here so the table markup is still valid
            <>
              <tr
                {...{ ...row.getRowProps(), ...row.getExpandedToggleProps() }}
                onClick={() => onClickRow(row.values)}
              >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
              {row.isExpanded ? (
                <tr>
                  <td colSpan={flatColumns.length}>
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              ) : null}
            </>
          )
        );
      })}
      </tbody>
    </table>
  );
}

// TODO: add prop-types
Table.propTypes = {
  onClickRow: func,
};

function Table({ columns, data, onClickRow }) {
  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '20px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    [],
  );

  return (
    <TableBlock>
      <TableContent
        columns={columns}
        data={data}
        // We added this as a prop for our table component
        // Remember, this is not part of the React Table API,
        // it's merely a rendering option we created for
        // ourselves
        renderRowSubComponent={renderRowSubComponent}
        onClickRow={onClickRow}
      />
    </TableBlock>
  );
}

export default Table;
