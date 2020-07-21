import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import LoginView from "./components/auth/LoginView";
import SignUpView from "./components/auth/SignUpView";
import ProjectsView from "./components/projects/ProjectsView";
import ProjectDetailView from "./components/project/ProjectDetailView";

import routes from "./routes";

import "./App.css";
import { AppContainer } from "./AppStyles";

import { ProjectsProvider } from "./components/contexts/ProjectsContext";
import { GroupsProvider } from "./components/contexts/GroupsContext";

function App(props) {
  const initialCredentials = {
    username: localStorage.getItem("taskManagerAuthenticationUsername"),
    token: localStorage.getItem("taskManagerAuthenticationToken"),
    permissionLevel: localStorage.getItem(
      "taskManagerAuthenticationPermissions"
    ),
  };
  const [userCredentials, setUserCredentials] = useState(initialCredentials);
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
        />
        <AppContainer>
          <Route exact path={routes.pages.home} component={HomeView} />
          <Route exact path={routes.pages.about} component={AboutView} />
          <ProjectsProvider>
            <Route
              exact
              path={routes.pages.projects.list}
              render={(props) => (
                <ProjectsView {...props} userCredentials={userCredentials} />
              )}
            />
            <GroupsProvider>
              <Route
                exact
                path={routes.pages.projects.detail(":projectSlug")}
                render={(props) => (
                  <ProjectDetailView
                    {...props}
                    userCredentials={userCredentials}
                  />
                )}
              />
            </GroupsProvider>
          </ProjectsProvider>
          <Route
            exact
            path={routes.pages.login}
            render={(props) => (
              <LoginView
                {...props}
                userCredentials={userCredentials}
                setUserCredentials={setUserCredentials}
              />
            )}
          />
          <Route exact path={routes.pages.signup} component={SignUpView} />
        </AppContainer>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
