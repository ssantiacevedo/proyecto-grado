import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { historyHelper } from "./helpers/historyHelper";
import { DataContextProvider } from "./context/Context";
import WrappedToastContainer from "./helpers/StyledToastContainer";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Mappings from "./pages/Mappings";
import "./App.css";

function App() {
  return (
    <DataContextProvider>
        <div className="app-container">
          <Router history={historyHelper}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/home" component={Home} />
              <Route exact path="/mappings" component={Mappings} />
              <Route path="">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </Router>
        </div>
        <WrappedToastContainer />
    </DataContextProvider>
  );
}

export default App;
