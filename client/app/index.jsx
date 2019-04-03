import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'app/pages/home';
import Users from 'app/pages/users';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route render={() => { window.location.href = '/404.html'; }} />
    </Switch>
  );
}
