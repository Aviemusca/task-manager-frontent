import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import LoginView from "./components/auth/LoginView";
import SignUpView from "./components/auth/SignUpView";
import ProjectsView from "./components/projects/ProjectsView";

import routes from "./routes";

import "./App.css";
import { AppContainer } from "./AppStyles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentials: {
        username: localStorage.getItem("taskManagerAuthenticationUsername"),
        token: localStorage.getItem("taskManagerAuthenticationToken"),
        permissionLevel: localStorage.getItem(
          "taskManagerAuthenticationPermissions"
        ),
      },
    };
  }

  setUserCredentials = (newUserCredentials) => {
    const newState = { ...this.state };
    newState.userCredentials = newUserCredentials;
    this.setState(newState);
  };

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Navbar
            userCredentials={this.state.userCredentials}
            setUserCredentials={this.setUserCredentials}
          />
          <AppContainer>
            <Route exact path={routes.pages.home} component={HomeView} />
            <Route exact path={routes.pages.about} component={AboutView} />
            <Route
              exact
              path={routes.pages.projects}
              render={(props) => (
                <ProjectsView
                  {...props}
                  userCredentials={this.userCredentials}
                />
              )}
            />
            <Route
              exact
              path={routes.pages.login}
              render={(props) => (
                <LoginView
                  {...props}
                  userCredentials={this.userCredentials}
                  setUserCredentials={this.setUserCredentials}
                />
              )}
            />
            <Route exact path={routes.pages.signup} component={SignUpView} />
          </AppContainer>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
