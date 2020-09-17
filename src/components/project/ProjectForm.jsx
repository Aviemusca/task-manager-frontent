import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import routes from "../../routes";
import { DateTimeInput } from "semantic-ui-calendar-react";

import { ProjectsContext } from "../contexts/ProjectsContext";

export const ProjectForm = () => {
  const { newProject, setNewProject, postNewProject } = useContext(
    ProjectsContext
  );
  const { title, description, deadline } = newProject;
  const [redirect, setRedirect] = React.useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const project = { ...newProject };
    project[name] = value;
    setNewProject(project);
  };
  const handleDeadlineChange = (event, { name, value }) => {
    setNewProject({ ...newProject, deadline: value });
    console.log();
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await postNewProject();
    setRedirect(routes.pages.projects.list);
  }
  return (
    <React.Fragment>
      {redirect && <Redirect to={redirect} />}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          novalidate
          label="Title"
          type="text"
          name="title"
          placeholder="Enter a project title"
          value={title}
          onChange={(event) => handleInputChange(event)}
          required
        />

        <Form.TextArea
          label="Description"
          type="text"
          name="description"
          placeholder="Enter a project description"
          value={description}
          onChange={(event) => handleInputChange(event)}
          required
        />
        <DateTimeInput
          label="Deadline"
          name="deadline"
          iconPosition="left"
          dateFormat="YYYY-MM-DD"
          timeFormat="24"
          placeholder="Select a deadline"
          value={deadline}
          onChange={handleDeadlineChange}
        />
        <Button type="submit" primary>
          Create
        </Button>
      </Form>
    </React.Fragment>
  );
};
