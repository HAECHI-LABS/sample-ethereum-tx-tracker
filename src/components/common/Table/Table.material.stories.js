import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import TableMaterial from './Table.material';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/material-ui/theme';
import { Main } from '../../../pages/layouts';

function createData(name, calories, fat) {
  return { name, calories, fat };
}

storiesOf('datastream/TableMaterial', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Main>
          {story()}
        </Main>
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('basic',
    () => (
      <TableMaterial
        columns={[
          {header: 'Name', accessor: 'name'},
          {header: 'Calories', accessor: 'calories'},
          {header: 'Fat', accessor: 'fat'},
        ]}
        data={[
          createData('Cupcake', 305, 3.7),
          createData('Donut', 452, 25.0),
          createData('Eclair', 262, 16.0),
          createData('Frozen yoghurt', 159, 6.0),
          createData('Gingerbread', 356, 16.0),
          createData('Honeycomb', 408, 3.2),
          createData('Ice cream sandwich', 237, 9.0),
          createData('Jelly Bean', 375, 0.0),
          createData('KitKat', 518, 26.0),
          createData('Lollipop', 392, 0.2),
          createData('Marshmallow', 318, 0),
          createData('Nougat', 360, 19.0),
          createData('Oreo', 437, 18.0),
        ]}
        page={0}
        onClickRow={() => console.log('clicked')}
      />
    ));
