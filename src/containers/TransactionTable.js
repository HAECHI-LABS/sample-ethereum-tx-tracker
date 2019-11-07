import React from 'react';
import styled from 'styled-components';
import Table from '../components/common/Table';
import Responsive from '../components/common/Responsive';
import { loadTransaction } from '../lib/api/transactions';


const TransactionTableStype = styled(Responsive)`
  display: flex;
  flex:2;
`;

// IntegrationList.propTypes = {};

export default class IntegrationList extends React.Component {
  constructor(){
        super()
        this.state = {transactions:[]}
    }
  componentDidMount() {
      setInterval(this.polling, 1000);
  }
  polling = async () => {
    this.setState({transactions: (await loadTransaction()).data})
  }

  render() {
        return (
        <TransactionTableStype>
        <Table
            columns={[
            {header: 'TransactionHash', accessor: 'transactionhash'},
            {header: 'Status', accessor: 'status'},
            {header: 'Nonce', accessor: 'Nonce'},
            {header: 'BlockNumber', accessor: 'blocknumber'},
            {header: 'GasUsed', accessor: 'gasused'}
            ]}
            data={ {
              transactions: this.state.transactions
            } }
            page={0}
            lastPage={this.state.length-1}
            rowsPerPage={10}
            onChangePage={(page) => {}}
        />
        </TransactionTableStype>
    );
    }
}

