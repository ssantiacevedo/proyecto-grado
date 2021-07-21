import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { historyHelper } from './helpers/historyHelper';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
  <div className="app-container">
    <Router history={historyHelper}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route path="">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  </div>
  );
}

export default App;
