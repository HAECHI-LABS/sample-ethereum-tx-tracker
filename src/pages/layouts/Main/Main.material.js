import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/common/Header';
import Container from '../../../components/common/Container/Container';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../../../lib/styles/material-ui/theme';
import { CssBaseline } from '@material-ui/core';

const Root = styled.div`
  display: flex;
  justify-content: center;
`;

MainMaterial.propTypes = {};

function MainMaterial({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> enables lib/material-ui/theme to work */}
      <CssBaseline />
      <Root>
        <Header/>
        <Container>
          { children }
        </Container>
      </Root>
    </ThemeProvider>
  );
}

export default MainMaterial;
