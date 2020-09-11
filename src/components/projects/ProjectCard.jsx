import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { CardTitle, CardDescription } from "./ProjectStyles";
import { Popup } from "semantic-ui-react";
import { StyledCard } from "../common/styles";
import { ProgressBar } from "../common/progressBar";
import { CardDates } from "../common/dates";
import TaskInfo from "../common/taskInfo";
import styled from "styled-components";

import routes from "../../routes";
import { axiosHeaders } from "../../axiosOptions";

const CardBodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  width: 90%;
  margin: 0 auto;
  margin-top: 0.25em;
  justify-content: space-between;
`;

const StyledGridLeft = styled.div`
  border-right: #bbb solid 1px;
  padding: 2em 2em;
`;
const StyledGridRight = styled.div`
  margin-top: 0.5em;
  padding: 2em 2em;
`;
const ProjectCardContainer = ({ project }) => {
  const [tasks, setTasks] = React.useState([]);

  const getProjectTasks = () => {
    axios
      .get(routes.api.tasks.projectViewset(project.slug), axiosHeaders)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.log(error));
  };
  React.useEffect(() => {
    getProjectTasks();
  }, []);
  return <ProjectCard project={project} tasks={tasks} />;
};

const ProjectCard = ({ project, tasks }) => {
  const { title, dateCreated, deadline, description, slug } = project;
  return (
    <StyledCard>
      <NavLink
        to={{
          pathname: routes.pages.projects.detail(slug),
          state: {
            project: project,
          },
        }}
      >
        <CardTitle>{title}</CardTitle>
      </NavLink>

      <CardBodyGrid>
        <StyledGridLeft>
          <CardDates dateCreated={dateCreated} deadline={deadline} />{" "}
          <Popup
            content="Description"
            trigger={<CardDescription>{description}</CardDescription>}
          />
        </StyledGridLeft>
        <StyledGridRight>
          <Popup
            trigger={
              <div>
                <ProgressBar items={tasks} />
              </div>
            }
            content="Completed Tasks"
          />
          <TaskInfo tasks={tasks} bgColor="#4c4cd530" />
        </StyledGridRight>
      </CardBodyGrid>
    </StyledCard>
  );
};
export default ProjectCardContainer;
export { ProjectCard };

// <CardSubTitle>
//
//          </CardSubTitle>
//
