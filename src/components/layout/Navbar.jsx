import React from "react";
import { Container, Dropdown, Image, Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";
import AddProjectModal from "../projects/AddProjectModal";
import { NavLink } from "react-router-dom";
import routes from "../../routes";

const NavWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const emptyCredentials = {
  username: null,
  token: null,
  permissionsLevel: null,
};

const NavbarContainer = ({ userCredentials, setUserCredentials }) => {
  const [addProjectMode, setAddProjectMode] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("Home");

  const handlers = {
    itemClick: (e, { name }) => setActiveItem(name),
    logout: () => {
      localStorage.removeItem("taskManagerAuthenticationToken");
      localStorage.removeItem("taskManagerAuthenticationUsername");
      setUserCredentials(emptyCredentials);
    },
  };
  return (
    <Navbar
      userCredentials={userCredentials}
      addProjectMode={addProjectMode}
      setAddProjectMode={setAddProjectMode}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      handlers={handlers}
    />
  );
};

const Navbar = ({
  userCredentials,
  addProjectMode,
  setAddProjectMode,
  activeItem,
  setActiveItem,
  handlers,
}) => (
  <div className="bg-gradient">
    <Menu fixed="top" inverted>
      <Container>
        <NavWrapper>
          <BaseMenuItems />
          {userCredentials.token ? (
            <AuthenticatedMenuItems
              addProjectMode={addProjectMode}
              setAddProjectMode={setAddProjectMode}
              userCredentials={userCredentials}
              handleLogout={handlers.logout}
            />
          ) : (
            <AuthenticationMenuItems />
          )}
        </NavWrapper>
      </Container>
    </Menu>
  </div>
);

const BaseMenuItems = () => (
  <React.Fragment>
    <Menu.Item as="a" header>
      <Image size="mini" src="" style={{ marginRight: "1.5em" }} />
      Task Manager
    </Menu.Item>
    <NavLink to={routes.pages.home}>
      <Menu.Item as="a">Home</Menu.Item>
    </NavLink>
    <NavLink to={routes.pages.about}>
      <Menu.Item as="a">About</Menu.Item>
    </NavLink>
    <NavLink to={routes.pages.contact}>
      <Menu.Item as="a">Contact</Menu.Item>
    </NavLink>
  </React.Fragment>
);

const AuthenticationMenuItems = () => (
  <React.Fragment>
    <NavLink to={routes.pages.login}>
      <Menu.Item as="a">Login</Menu.Item>
    </NavLink>
    <NavLink to={routes.pages.signup}>
      <Menu.Item as="a">Sign up</Menu.Item>
    </NavLink>
  </React.Fragment>
);

const AuthenticatedMenuItems = ({
  addProjectMode,
  setAddProjectMode,
  userCredentials,
  handleLogout,
}) => (
  <React.Fragment>
    <NavLink to={routes.pages.projects.list}>
      <Menu.Item as="a">Projects</Menu.Item>
    </NavLink>
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
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </React.Fragment>
);

export default NavbarContainer;
