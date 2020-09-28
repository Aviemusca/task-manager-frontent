import React from "react";
import { Container, Dropdown, Image, Menu, Icon } from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import routes from "../../routes";

const emptyCredentials = {
  username: null,
  token: null,
  permissionsLevel: null,
};

const NavbarContainer = ({ userCredentials, setUserCredentials }) => {
  const [redirect, setRedirect] = React.useState("");
  const handlers = {
    logout: () => {
      localStorage.removeItem("taskManagerAuthenticationToken");
      localStorage.removeItem("taskManagerAuthenticationUsername");
      setUserCredentials(emptyCredentials);
      setRedirect(routes.pages.home);
    },
  };
  return (
    <Navbar
      userCredentials={userCredentials}
      handlers={handlers}
      redirect={redirect}
    />
  );
};

const Navbar = ({ userCredentials, handlers, redirect }) => (
  <div className="bg-gradient">
    <Menu fixed="top" inverted pointing>
      <Container>
        {redirect && <Redirect to={redirect} />}
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
      Taskma
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
