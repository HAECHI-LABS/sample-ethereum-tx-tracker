import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/material-ui/theme';

import { storiesOf } from '@storybook/react';

import TextInput from './TextInput.material';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CopyButton from '@material-ui/icons/FileCopy';

storiesOf('common/TextInput', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('basic', () => <TextInput label="Basic"/>)
  .add('with readOnly and default value', () => (
    <TextInput
      label="ReadOnly"
      defaultValue={"Default Value"}
      inputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
            >
              <CopyButton />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  ));
