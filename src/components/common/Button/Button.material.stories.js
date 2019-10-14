import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('common/Button', module)
  .addDecorator(story => (
    <BrowserRouter>{story()}</BrowserRouter>
  ))
  .add('basic',
    () => (
      <Button>
        Submit
      </Button>
    ))
  .add('contained',
    () => (
      <Button
        variant="contained"
      >
        Submit
      </Button>
    ))
  .add('contained + primary',
    () => (
      <Button
        variant="contained"
        color="primary">
        Submit
      </Button>
    ))
  .add('full width',
    () => (
      <Button
        variant="contained"
        fullWidth
      >
        Full width
      </Button>
    ))
  .add('with href button',
    () => (
      <Button
        variant="contained"
        href={"https://www.google.com"}
      >
        Href Button
      </Button>
    ))
  .add('with user-defined height',
    () => (
      <Button
        variant="contained"
        height={"15rem"}
      >
        Long Button
      </Button>
    ))
