import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { historyHelper } from "./helpers/historyHelper";
import { DataContextProvider } from "./context/Context";
import WrappedToastContainer from "./helpers/StyledToastContainer";
import { PopperContextProvider } from "./helpers/usePopper";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Mappings from "./pages/Mappings";
import Download from "./pages/Download";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <>
      <PopperContextProvider>
        <div className="app-container">
          <Router history={historyHelper}>
            <DataContextProvider>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <Route exact path="/home" component={Home} />
                <Route exact path="/mappings" component={Mappings} />
                <Route exact path="/download" component={Download} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route path="">
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </DataContextProvider>
          </Router>
        </div>
      </PopperContextProvider>
      <WrappedToastContainer />
    </>
  );
}

export default App;
