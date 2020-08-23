import React from "react";
import { Button, Popup, Icon, Form } from "semantic-ui-react";
import styled from "styled-components";
import { ProgressBar } from "../common/progressBar";
import { MiniIconButton } from "../common/buttons";
import { StyledCard, StyledHeader, StyledTitle } from "../common/styles";
import UpdateGroupModal from "./UpdateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import { GroupTaskList } from "./TaskList";
import { TasksContext } from "../contexts/TasksContext";

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

  return <GroupCard state={state} setState={setState} />;
};

const GroupCard = ({ state, setState }) => {
  const { setShowOptions } = setState;
  const { setAddTaskMode } = setState.setModes;
  return (
    <StyledCard
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
    </StyledCard>
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
    <StyledHeader>
      <StyledTitle>{group.title}</StyledTitle>
      {showOptions && <OptionButtons setModes={setModes} />}
    </StyledHeader>
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
    <div>
      <Button.Group size="mini">
        <MiniIconButton
          handleClick={() => setAddTaskMode(true)}
          popupContent={"Add a new Task"}
          iconName="plus"
        />
        <MiniIconButton
          handleClick={() => setEditMode(true)}
          popupContent={"Edit Task Group"}
          iconName="edit"
        />
        <MiniIconButton
          handleClick={() => setDeleteMode(true)}
          popupContent={"Delete Task Group"}
          iconName="trash"
          color="red"
          inverted={true}
        />
      </Button.Group>
    </div>
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
