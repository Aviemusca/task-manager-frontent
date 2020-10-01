import React, { useContext } from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import styled from "styled-components";

import ProjectCard from "./ProjectCard";

import { CardGrid } from "./ProjectStyles";
import { ProjectsContext } from "../contexts/ProjectsContext";

const StyledTitle = styled.h2`
  padding: 1em 1em;
  text-align: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectCardList = ({ projects }) => {
  const handleClick = () => window.location.reload();

  return (
    <React.Fragment>
      {projects.length !== 0 ? (
        <CardGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </CardGrid>
      ) : (
        <React.Fragment>
          <StyledTitle>You have no projects!</StyledTitle>
          <ButtonWrapper>
            <Button onClick={handleClick} size="tiny" inverted>
              Reload
            </Button>
          </ButtonWrapper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProjectCardList;
