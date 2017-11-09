import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/login/Login';
import Main from './Main';

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Main />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
