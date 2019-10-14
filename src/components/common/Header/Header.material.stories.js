import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/material-ui/theme';

import { storiesOf } from '@storybook/react';

import Header from './Header';

const Container = styled.div`
  
`;

storiesOf('common/Header', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>

        {story()}
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('basic', () => <Header />)
