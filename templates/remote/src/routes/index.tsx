import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import DummyPage from '../pages/DummyPage';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={DummyPage} />
      </Switch>
    </BrowserRouter>
  );
};
