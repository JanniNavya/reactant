import React, { FC, ReactNode } from 'react';
import { Provider } from '@reactant/redux/thunk';
import { Route, Switch, Router, Link } from '@reactant/router';
import { Text } from 'react-native';

export interface AppProps {
  children?: ReactNode;
}

const App: FC<AppProps> = (props: AppProps) => (
  <Provider>
    <Router>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>
      <Link to="/">Home</Link>
      {props.children}
      <Switch>
        <Route path="/about">
          <Text>About</Text>
        </Route>
        <Route path="/users">
          <Text>Users</Text>
        </Route>
        <Route path="/">
          <Text>Home</Text>
        </Route>
      </Switch>
    </Router>
  </Provider>
);

App.defaultProps = {
  children: 'Hello, reactant!'
};

export default App;
