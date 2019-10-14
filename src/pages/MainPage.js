import React from 'react';
import { Main } from './layouts';
import TransactionTable from '../containers/TransactionTable';
import MetaInfoPaper from '../containers/MetaInfoPaper';
import TransactionButton from '../components/TransactionButton';

function MainPage() {
  return (
    <Main>
        <MetaInfoPaper />
        <TransactionButton />
        <TransactionTable />
    </Main>
  );
}

export default MainPage;
