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
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import {
  login,
  logout,
  isLoggedIn,
  requireAuth
} from "./components/AuthService";
import AllProfiles from "./components/AllProfiles";
import Callback from "./Callback";
import { Button } from "reactstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Kimppalada</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline color="secondary" href="/AllProfiles">
                  Kaikki kyydit
                </Button>
                &nbsp;
                {isLoggedIn() ? (
                  <Button outline color="secondary" onClick={() => logout()}>
                    Log out{" "}
                  </Button>
                ) : (
                  <Button outline color="secondary" onClick={() => login()}>
                    Log In
                  </Button>
                )}
              </NavItem>
              <UncontrolledDropdown nav inNavbar />
            </Nav>
          </Navbar>
        </div>

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
      </div>
    );
  }
}

export default App;
