import React from "react";
import styled from "styled-components";
import { Form, Radio, Dropdown } from "semantic-ui-react";

const Container = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

const Title = styled.h2`
  padding: 0.5em 1em;
  text-align: center;
`;

const ProjectSideBar = ({ project }) => {
  const [queueType, setQueueType] = React.useState("priority");
  const [queueGroup, setQueueGroup] = React.useState("");

  return (
    <Container>
      <Title>Task Manager</Title>
      Order by{" "}
      <Dropdown item simple text={queueType}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setQueueType("priority")}>
            Priority
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setQueueType("group")}>
            Group
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default ProjectSideBar;
