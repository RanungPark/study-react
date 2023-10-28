import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coins from './Coins';
import Coin from './Coin';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/coin-tracker/:coinId">
          <Coin />
        </Route>
        <Route path="/coin-tracker">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;