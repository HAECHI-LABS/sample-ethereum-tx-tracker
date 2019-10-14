import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/material-ui/theme';

import { storiesOf } from '@storybook/react';
import Main from './index';

storiesOf('pages/Layout', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('basic', () => (
    <Main>
      <div>Test Content</div>
    </Main>
  ));
