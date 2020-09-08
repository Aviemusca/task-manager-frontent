import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import LoginView from "./components/auth/LoginView";
import SignUpView from "./components/auth/SignUpView";
import ProjectsView from "./components/projects/ProjectsView";
import ProjectDetailView from "./components/project/ProjectDetailView";

import routes from "./routes";

import "./App.css";
import { AppContainer } from "./AppStyles";

import { ProjectsProvider } from "./components/contexts/ProjectsContext";
import { GroupsProvider } from "./components/contexts/GroupsContext";
import { TasksProvider } from "./components/contexts/TasksContext";
import { FiltersProvider } from "./components/contexts/FiltersContext";

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
        <ProjectsProvider>
          <Navbar
            userCredentials={userCredentials}
            setUserCredentials={setUserCredentials}
          />
          <AppContainer>
            <Route exact path={routes.pages.home} component={HomeView} />
            <Route exact path={routes.pages.about} component={AboutView} />
            <Route exact path={routes.pages.contact} component={ContactView} />
            <Route
              exact
              path={routes.pages.projects.list}
              render={(props) => (
                <ProjectsView {...props} userCredentials={userCredentials} />
              )}
            />
            <GroupsProvider>
              <TasksProvider>
                <FiltersProvider>
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
                </FiltersProvider>
              </TasksProvider>
            </GroupsProvider>
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
        </ProjectsProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
