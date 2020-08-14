import React from "react";
import { Button, Popup, Icon, Form } from "semantic-ui-react";
import styled from "styled-components";
import { ProgressBar } from "../common/progressBar";
import UpdateGroupModal from "./UpdateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import { GroupTaskList } from "./TaskList";
import { TasksContext } from "../contexts/TasksContext";

const Card = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
  padding: 1em;
  &:hover {
    box-shadow: 8px 6px 0px 0 rgba(0, 0, 0, 0.3),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
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

const AddTaskStyle = styled.div`
  margin: 1em 0;
`;

const GroupCardContainer = ({ group }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [addTaskMode, setAddTaskMode] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);

  const state = {
    modes: {
      addTaskMode,
      editMode,
      deleteMode,
    },
    showOptions,
    group,
  };

  const setState = {
    setModes: {
      setAddTaskMode,
      setEditMode,
      setDeleteMode,
    },
    setShowOptions,
  };

  const handlers = {};

  return <GroupCard state={state} setState={setState} handlers={handlers} />;
};

const GroupCard = ({ state, setState, handlers }) => {
  const { setShowOptions } = setState;
  const { setAddTaskMode } = setState.setModes;
  return (
    <Card
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => {
        setShowOptions(false);
        setAddTaskMode(false);
      }}
    >
      <GroupHeader state={state} setState={setState} />
      <GroupModals state={state} setState={setState} />
      <GroupProgressBar group={state.group} />
      <AddTaskContainer state={state} setState={setState} />
      <GroupTaskList group={state.group} />
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
  const { setModes } = setState;
  return (
    <Header>
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
  const { setAddTaskMode, setEditMode, setDeleteMode } = setModes;
  return (
    <span styles={{ transition: "all 1s ease" }}>
      <AddTaskButton setAddTaskMode={setAddTaskMode} />
      <EditButton setEditMode={setEditMode} />
      <DeleteButton setDeleteMode={setDeleteMode} />
    </span>
  );
};

const AddTaskButton = ({ setAddTaskMode }) => {
  return (
    <Popup
      content="Add a new task"
      trigger={
        <Button
          icon
          background="transparent"
          size="mini"
          onClick={() => setAddTaskMode(true)}
        >
          <Icon name="plus" />
        </Button>
      }
    />
  );
};

const EditButton = ({ setEditMode }) => {
  return (
    <Popup
      content="Edit task group"
      trigger={
        <Button
          icon
          background="transparent"
          size="mini"
          onClick={() => setEditMode(true)}
        >
          <Icon name="edit" />
        </Button>
      }
    />
  );
};

const DeleteButton = ({ setDeleteMode }) => {
  return (
    <Popup
      content="Delete task group"
      trigger={
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
      }
    />
  );
};

const AddTaskContainer = ({ state, setState }) => {
  const { group } = state;
  const { addTaskMode } = state.modes;
  const { setAddTaskMode } = setState.setModes;
  const emptyTask = {
    title: "",
    description: "",
    projectSlug: group.projectSlug,
    group: group.id,
  };
  const { postTask } = React.useContext(TasksContext);
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
    <React.Fragment>
      {addTaskMode && (
        <AddTask setOpen={setAddTaskMode} task={newTask} handlers={handlers} />
      )}
    </React.Fragment>
  );
};

const AddTask = ({ setOpen, task, handlers }) => {
  return (
    <AddTaskStyle onClick={() => setOpen(true)}>
      <AddTaskForm task={task} handlers={handlers} />
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

export default GroupCardContainer;
