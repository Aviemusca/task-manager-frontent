import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import LoginView from "./components/auth/LoginView";
import SignUpView from "./components/auth/SignUpView";
import ProjectsView from "./components/projects/ProjectsView";
import AddProjectView from "./components/project/AddProjectView";
import ProjectDetailView from "./components/project/ProjectDetailView";

import routes from "./routes";
import { axiosHeaders } from "./axiosOptions";

import "./App.css";

import { ProjectsProvider } from "./components/contexts/ProjectsContext";
import { GroupsProvider } from "./components/contexts/GroupsContext";
import { TasksProvider } from "./components/contexts/TasksContext";
import { FiltersProvider } from "./components/contexts/FiltersContext";

const AppWrapper = styled.div`
  width: 89%;
  padding: 1em 4em;
  margin: 3em auto;
`;

const backendPingMsg = {
  name: "visit",
  email: "hasVisited@email.com",
  message: "This is an automated message to trigger the backend server.",
};

const AppContainer = (props) => {
  const initialCredentials = {
    username: localStorage.getItem("taskManagerAuthenticationUsername"),
    token: localStorage.getItem("taskManagerAuthenticationToken"),
    permissionLevel: localStorage.getItem(
      "taskManagerAuthenticationPermissions"
    ),
  };
  const [userCredentials, setUserCredentials] = useState(initialCredentials);
  React.useEffect(() => {
    pingBackend();
  }, []);
  const pingBackend = () => {
    axios
      .post(routes.api.contacts.create, backendPingMsg, axiosHeaders)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return (
    <App
      userCredentials={userCredentials}
      setUserCredentials={setUserCredentials}
    />
  );
};
const App = (props) => {
  const { userCredentials, setUserCredentials } = props;

  return (
    <React.Fragment>
      <BrowserRouter>
        <ProjectsProvider>
          <Navbar
            userCredentials={userCredentials}
            setUserCredentials={setUserCredentials}
          />
          <AppWrapper>
            <Route exact path={routes.pages.home} component={HomeView} />
            <Route exact path={routes.pages.about} component={AboutView} />
            <Route exact path={routes.pages.contact} component={ContactView} />
            <Route
              exact
              path={routes.pages.addProject}
              component={AddProjectView}
            />
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
          </AppWrapper>
        </ProjectsProvider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppContainer;
