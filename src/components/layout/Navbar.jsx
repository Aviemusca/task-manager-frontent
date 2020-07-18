import React from "react";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
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
  const isAuthenticated = () => userCredentials.token;
  const injectAuthenticationMenuItems = () => {
    return isAuthenticated() ? (
      <Dropdown item simple text={userCredentials.username}>
        <Dropdown.Menu>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Change Password</Dropdown.Item>
          <Dropdown.Item onClick={() => handleLogout(setUserCredentials)}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
          <Dropdown item simple text="Projects">
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className="dropdown icon" />
                <span className="text">Submenu</span>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {injectAuthenticationMenuItems()}
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;
