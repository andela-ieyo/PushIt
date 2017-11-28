import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import LoginPage from './components/login/Login';
import Main from './Main';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Main />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
