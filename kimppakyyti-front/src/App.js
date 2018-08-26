import React, { Component } from "react";
import "./App.css";
import FirstPage from "./FirstPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { browserHistory } from "react-router";
import RideSearchPage from "./RideSearchPage";
import AddRide from "./components/AddRide";
import { Container } from "reactstrap";
import { requireAuth } from "./components/AuthService";
import AllProfiles from "./components/AllProfiles";
import Callback from "./Callback";
import NavComponent from "./Navbar";
import MainArea from "./MainArea";

class App extends Component {
  force() {
    this.forceUpdate();
  }
  render() {
    return (
      <div className="App">
        <div>
          <NavComponent />
          <MainArea />
        </div>
        <Container>
          <Router history={browserHistory}>
            <Switch>
              <Route exact path="/firstpage" component={FirstPage} />
              <Route
                exact
                path="/AllProfiles"
                component={AllProfiles}
                onEnter={requireAuth}
              />
              <Route exact path="/ridesearchpage" component={RideSearchPage} />
              <Route exact path="/addride" component={AddRide} />
              <Route path="/callback" component={Callback} />
              <Redirect exact from="/" to="/firstpage" />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
