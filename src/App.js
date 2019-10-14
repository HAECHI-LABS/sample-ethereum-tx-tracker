import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';

// TODO: Add page not found exception
// TODO: Change into authenticated route, App should check token otherwise redirect to login page
function App() {
  return (
    <Switch>
      <Route
        component={MainPage}
        path={[ '/']}
        exact
      />
    </Switch>
  );
}

export default App;

