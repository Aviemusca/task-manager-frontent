import React from "react";
import { Button, Icon, Form } from "semantic-ui-react";
import styled from "styled-components";
import UpdateGroupModal from "./UpdateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import TaskList from "./TaskList";
import { axiosHeaders } from "../../axiosOptions";
import axios from "axios";
import routes from "../../routes";

const Card = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
  padding: 1em;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 0.5em;
  border-bottom: solid 1px #bbb;
`;

const Title = styled.h2`
  width: 60%;
  margin-bottom: 0;
`;

const CardSubTitle = styled.h4`
  text-color: #777;
`;

const CardDescription = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const AddTask = styled.div``;

const GroupCardContainer = ({ group }) => {
  const { title, dateCreated, description } = group;
  const [showEditButtons, setShowEditButtons] = React.useState(false);
  const [editGroupMode, setEditGroupMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);

  const emptyTask = { title: "", description: "" };
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState(emptyTask);

  React.useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios
      .get(routes.api.tasks.viewset(group.projectSlug, group.id), axiosHeaders)
      .then((response) => setTasks(response.data))
      .catch((error) => console.log(error));
  };

  const injectEditGroupButtons = () => {
    if (showEditButtons)
      return (
        <span>
          <Button
            icon
            background="transparent"
            size="mini"
            onClick={() => setEditGroupMode(true)}
          >
            <Icon name="edit" />
          </Button>
          <Button
            icon
            inverted
            color="red"
            background="transparent"
            size="mini"
            onClick={() => setDeleteMode(true)}
          >
            <Icon name="trash" />
          </Button>
        </span>
      );
  };

  const injectUpdateGroupModal = () => {
    if (editGroupMode)
      return (
        <UpdateGroupModal
          modalOpen={editGroupMode}
          closeModal={() => setEditGroupMode(false)}
          group={group}
        />
      );
  };
  const injectDeleteGroupModal = () => {
    if (deleteMode)
      return (
        <DeleteGroupModal
          modalOpen={deleteMode}
          closeModal={() => setDeleteMode(false)}
          group={group}
        />
      );
  };
  const injectAddTask = () => {
    return showAddTask ? (
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            placeholder="Add a new task"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </Form.Field>
      </Form>
    ) : (
      <div style={{ textAlign: "center", transition: "2s" }}>
        <Icon name="chevron down" />
      </div>
    );
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const task = { ...newTask };
    task[name] = value;
    setNewTask(task);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postTask();
  };

  const postTask = () => {
    axios
      .post(
        routes.api.tasks.viewset(group.projectSlug, group.id),
        newTask,
        axiosHeaders
      )
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask(emptyTask);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card>
      <Header
        onMouseOver={() => setShowEditButtons(true)}
        onMouseLeave={() => setShowEditButtons(false)}
      >
        <Title>{title}</Title>
        {injectEditGroupButtons()}
      </Header>
      {injectUpdateGroupModal()}
      {injectDeleteGroupModal()}
      <AddTask
        onClick={() => setShowAddTask(true)}
        onMouseLeave={() => setShowAddTask(false)}
      >
        {injectAddTask()}
      </AddTask>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Card>
  );
};

export default GroupCardContainer;
