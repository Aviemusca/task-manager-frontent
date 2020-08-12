import React from "react";
import { Button, Icon, Form } from "semantic-ui-react";
import styled from "styled-components";
import { ProgressBar } from "../common/progressBar";
import UpdateGroupModal from "./UpdateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import { GroupTaskList } from "./TaskList";
import { TasksContext } from "../contexts/TasksContext";
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

const AddTaskStyle = styled.div``;

const GroupCardContainer = ({ group }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [progress, setProgress] = React.useState(group.completion);

  const state = {
    modes: {
      editMode,
      deleteMode,
    },
    showOptions,
    progress,
    group,
  };

  const setState = {
    setModes: {
      setEditMode,
      setDeleteMode,
    },
    setShowOptions,
  };

  const handlers = {
    //  handleProgressChange,
  };

  return <GroupCard state={state} setState={setState} handlers={handlers} />;
};

const GroupCard = ({ state, setState, handlers }) => {
  return (
    <Card>
      <GroupHeader state={state} setState={setState} />
      <GroupModals state={state} setState={setState} />
      <GroupProgressBar group={state.group} />
      <AddTaskContainer group={state.group} />
      <GroupTaskList
        group={state.group}
        onProgressChange={handlers.handleProgressChange}
      />
    </Card>
  );
};

const GroupProgressBar = ({ group }) => {
  const { projectTasks } = React.useContext(TasksContext);

  return (
    <ProgressBar
      items={projectTasks.filter((task) => task.groupId === group.id)}
    />
  );
};

const GroupHeader = ({ state, setState }) => {
  const { showOptions, group } = state;
  const { setShowOptions, setModes } = setState;
  return (
    <Header
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <Title>{group.title}</Title>
      {showOptions && <OptionButtons setModes={setModes} />}
    </Header>
  );
};

const GroupModals = ({ state, setState }) => {
  const { modes, group } = state;
  const { editMode, deleteMode } = modes;
  const { setEditMode, setDeleteMode } = setState.setModes;
  return (
    <React.Fragment>
      {editMode && (
        <UpdateGroupModal closeModal={() => setEditMode(false)} group={group} />
      )}
      {deleteMode && (
        <DeleteGroupModal
          modalOpen={deleteMode}
          closeModal={() => setDeleteMode(false)}
          group={group}
        />
      )}
    </React.Fragment>
  );
};

const OptionButtons = ({ setModes }) => {
  const { setEditMode, setDeleteMode } = setModes;
  return (
    <span>
      <EditButton setEditMode={setEditMode} />
      <DeleteButton setDeleteMode={setDeleteMode} />
    </span>
  );
};

const EditButton = ({ setEditMode }) => {
  return (
    <Button
      icon
      background="transparent"
      size="mini"
      onClick={() => setEditMode(true)}
    >
      <Icon name="edit" />
    </Button>
  );
};

const DeleteButton = ({ setDeleteMode }) => {
  return (
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
  );
};

const AddTaskContainer = ({ group }) => {
  const emptyTask = {
    title: "",
    description: "",
    projectSlug: group.projectSlug,
    group: group.id,
  };
  const { postTask } = React.useContext(TasksContext);
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [newTask, setNewTask] = React.useState(emptyTask);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const task = { ...newTask };
    task[name] = value;
    setNewTask(task);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await postTask(newTask);
    setNewTask(emptyTask);
  }

  const handlers = {
    change: handleChange,
    submit: handleSubmit,
  };
  return (
    <AddTask
      showAddTask={showAddTask}
      setShowAddTask={setShowAddTask}
      task={newTask}
      handlers={handlers}
    />
  );
};

const AddTask = ({ showAddTask, setShowAddTask, task, handlers }) => {
  return (
    <AddTaskStyle
      onClick={() => setShowAddTask(true)}
      onMouseLeave={() => setShowAddTask(false)}
    >
      {showAddTask ? (
        <AddTaskForm task={task} handlers={handlers} />
      ) : (
        <AddTaskChevron />
      )}
    </AddTaskStyle>
  );
};

const AddTaskForm = ({ task, handlers }) => {
  return (
    <Form onSubmit={handlers.submit}>
      <Form.Field>
        <input
          placeholder="Add a new task"
          name="title"
          value={task.title}
          onChange={handlers.change}
        />
      </Form.Field>
    </Form>
  );
};

const AddTaskChevron = () => {
  return (
    <div style={{ textAlign: "center", transition: "2s" }}>
      <Icon name="chevron down" />
    </div>
  );
};

export default GroupCardContainer;
