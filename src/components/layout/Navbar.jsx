import React from "react";
import { Container, Dropdown, Image, Menu, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";

const emptyCredentials = {
  username: null,
  token: null,
  permissionsLevel: null,
};

const NavbarContainer = ({ userCredentials, setUserCredentials }) => {
  const [activeItem, setActiveItem] = React.useState("home");

  const handlers = {
    itemClick: (e, { name }) => setActiveItem(name),
    logout: () => {
      localStorage.removeItem("taskManagerAuthenticationToken");
      localStorage.removeItem("taskManagerAuthenticationUsername");
      setUserCredentials(emptyCredentials);
    },
  };
  return <Navbar userCredentials={userCredentials} handlers={handlers} />;
};

const Navbar = ({ userCredentials, activeItem, handlers }) => (
  <div className="bg-gradient">
    <Menu fixed="top" inverted pointing>
      <Container>
        <BaseMenuItems />
        <Menu.Menu position="right">
          {userCredentials.token ? (
            <AuthenticatedMenuItems
              userCredentials={userCredentials}
              handlers={handlers}
            />
          ) : (
            <AuthenticationMenuItems />
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

const BaseMenuItems = () => (
  <React.Fragment>
    <Menu.Item as="a" header>
      <Image size="mini" src="" style={{ marginRight: "1.5em" }} />
      Tamska
    </Menu.Item>
    <NavLink to={routes.pages.home}>
      <Menu.Item as="a" name="home" />
    </NavLink>
    <NavLink to={routes.pages.about}>
      <Menu.Item as="a" name="about" />
    </NavLink>
    <NavLink to={routes.pages.contact}>
      <Menu.Item as="a" name="contact" />
    </NavLink>
  </React.Fragment>
);

const AuthenticationMenuItems = () => (
  <React.Fragment>
    <NavLink to={routes.pages.login}>
      <Menu.Item as="a" name="login" />
    </NavLink>
    <NavLink to={routes.pages.signup}>
      <Menu.Item as="a" name="sign up" />
    </NavLink>
  </React.Fragment>
);

const AuthenticatedMenuItems = ({ userCredentials, handlers }) => (
  <React.Fragment>
    <NavLink to={routes.pages.projects.list}>
      <Menu.Item as="a" name="my projects" />
    </NavLink>
    <NavLink to={routes.pages.addProject}>
      <Menu.Item as="a" name="new project">
        <Icon name="plus" /> Project
      </Menu.Item>
    </NavLink>

    <Dropdown item simple text={userCredentials.username}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handlers.logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </React.Fragment>
);

export default NavbarContainer;
