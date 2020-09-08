import React from "react";
import { Container, Dropdown, Image, Menu, Icon } from "semantic-ui-react";
import AddProjectModal from "../projects/AddProjectModal";
import { NavLink } from "react-router-dom";
import routes from "../../routes";

const injectAppNameMenuItem = () => (
  <Menu.Item as="a" header>
    <Image size="mini" src="" style={{ marginRight: "1.5em" }} />
    Task Manager
  </Menu.Item>
);

const injectMenuLinkItem = (title, url) => (
  <NavLink to={url}>
    <Menu.Item as="a">{title}</Menu.Item>
  </NavLink>
);

const handleLogout = (setUserCredentials) => {
  localStorage.removeItem("taskManagerAuthenticationToken");
  localStorage.removeItem("taskManagerAuthenticationUsername");
  const newCredentials = {
    username: null,
    token: null,
    permissionsLevel: null,
  };
  setUserCredentials(newCredentials);
};

const Navbar = ({ userCredentials, setUserCredentials }) => {
  const [addProjectMode, setAddProjectMode] = React.useState(false);

  const isAuthenticated = () => userCredentials.token;
  const injectAuthenticationMenuItems = () => {
    return isAuthenticated() ? (
      <React.Fragment>
        <AddProjectModal
          modalOpen={addProjectMode}
          closeModal={() => setAddProjectMode(false)}
        />
        <Menu.Item as="a" onClick={() => setAddProjectMode(true)}>
          <Icon name="plus" />
          Project
        </Menu.Item>
        <Dropdown item simple text={userCredentials.username}>
          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Change Password</Dropdown.Item>
            <Dropdown.Item onClick={() => handleLogout(setUserCredentials)}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {injectMenuLinkItem("Login", routes.pages.login)}
        {injectMenuLinkItem("Sign Up", routes.pages.signup)}
      </React.Fragment>
    );
  };

  const injectProjectsLinkItem = () => {
    if (isAuthenticated())
      return injectMenuLinkItem("Projects", routes.pages.projects.list);
  };
  return (
    <div className="bg-gradient">
      <Menu fixed="top" inverted>
        <Container>
          {injectAppNameMenuItem()}
          {injectMenuLinkItem("Home", routes.pages.home)}
          {injectMenuLinkItem("About", routes.pages.about)}
          {injectMenuLinkItem("Contact", routes.pages.contact)}
          {injectProjectsLinkItem()}

          {injectAuthenticationMenuItems()}
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;
