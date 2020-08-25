import React from "react";
import styled from "styled-components";
import { Popup, Button, Modal } from "semantic-ui-react";
import { TasksContext } from "../contexts/TasksContext";
import { ProgressBar } from "../common/progressBar";
import {
  StyledCard,
  StyledHeader,
  StyledTitle,
  CustomFormContainerLg,
  CustomFormTitle,
} from "../common/styles";
import { MiniIconButton } from "../common/buttons";
import { SideBarTaskList } from "./TaskList";
import { UpdateProjectForm } from "./UpdateProjectForm";
import DeleteModal from "./DeleteProjectModal";
import AddGroupModal from "./AddGroupModal";
import SortModal from "./SortModal";
import sortOptions from "./sortOptions";

const StyledSortDisplay = styled.div`
  display: flex;
  justify-content: space-around;
  text-color: #777;
`;
const SideBarContainer = ({ project }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [addGroupMode, setAddGroupMode] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [sortMode, setSortMode] = React.useState(false);
  const [filterMode, setFilterMode] = React.useState(false);
  const [archiveMode, setArchiveMode] = React.useState(false);
  const [sortPropIndices, setSortPropIndices] = React.useState(
    sortOptions.map((item) => 0)
  );

  const state = {
    modes: {
      addGroupMode,
      editMode,
      deleteMode,
      sortMode,
      filterMode,
      archiveMode,
    },
    showOptions,
    sortPropIndices,
    project,
  };

  const setState = {
    setModes: {
      setAddGroupMode,
      setEditMode,
      setDeleteMode,
      setSortMode,
      setFilterMode,
      setArchiveMode,
    },
    setShowOptions,
    setSortPropIndices,
  };
  return <SideBar state={state} setState={setState} />;
};
const SideBar = ({ state, setState }) => {
  const { project, sortPropIndices } = state;
  const { setShowOptions, setModes } = setState;
  const { setAddGroupMode } = setState.setModes;

  return (
    <StyledCard
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => {
        setShowOptions(false);
        setAddGroupMode(false);
      }}
    >
      <Header setModes={setModes} />
      <Modals state={state} setState={setState} />
      <ProjectProgressBar />
      <TaskOptionButtons setModes={setModes} />
      <SortOrderBreadcrumbs sortPropIndices={sortPropIndices} />
      <SideBarTaskList project={project} />
    </StyledCard>
  );
};

const Header = ({ setModes }) => {
  return (
    <StyledHeader>
      <StyledTitle>Project Manager</StyledTitle>
      <ProjectOptionButtons setModes={setModes} />
    </StyledHeader>
  );
};
const Modals = ({ state, setState }) => {
  const { modes, project, sortPropIndices } = state;
  const { addGroupMode, editMode, deleteMode, sortMode } = modes;
  const {
    setAddGroupMode,
    setEditMode,
    setDeleteMode,
    setSortMode,
  } = setState.setModes;
  return (
    <React.Fragment>
      {addGroupMode && (
        <AddGroupModal
          modalOpen={addGroupMode}
          closeModal={() => setAddGroupMode(false)}
          projectSlug={project.slug}
        />
      )}
      {editMode && (
        <EditProjectModal
          closeModal={() => setEditMode(false)}
          project={project}
        />
      )}
      {deleteMode && (
        <DeleteModal
          modalOpen={deleteMode}
          closeModal={() => setDeleteMode(false)}
          projectSlug={project.slug}
        />
      )}
      {sortMode && (
        <SortModal
          modalOpen={sortMode}
          closeModal={() => setSortMode(false)}
          project={project}
          sortPropIndices={sortPropIndices}
          setSortPropIndices={setState.setSortPropIndices}
        />
      )}
    </React.Fragment>
  );
};
const EditProjectModal = ({ closeModal, project }) => {
  return (
    <Modal open onClose={closeModal}>
      <Modal.Content>
        <CustomFormContainerLg>
          <CustomFormTitle>Edit Project</CustomFormTitle>
          <UpdateProjectForm closeModal={closeModal} project={project} />
        </CustomFormContainerLg>
      </Modal.Content>
      <Modal.Description></Modal.Description>
    </Modal>
  );
};

const ProjectOptionButtons = ({ setModes }) => {
  const { setAddGroupMode, setEditMode, setDeleteMode } = setModes;
  return (
    <div>
      <Button.Group>
        <MiniIconButton
          handleClick={() => setAddGroupMode(true)}
          iconName={"plus"}
          popupContent={"New Task Group"}
        />
        <MiniIconButton
          handleClick={() => setEditMode(true)}
          iconName={"edit"}
          popupContent={"Edit Project"}
        />
        <MiniIconButton
          handleClick={() => setDeleteMode(true)}
          iconName={"trash"}
          popupContent={"Delete Project"}
          inverted={true}
          color="red"
        />
      </Button.Group>
    </div>
  );
};
const TaskOptionButtons = ({ setModes }) => {
  const { setSortMode, setFilterMode, setArchiveMode } = setModes;
  return (
    <div>
      <Button.Group>
        <MiniIconButton
          handleClick={() => setSortMode(true)}
          iconName={"sort"}
          popupContent={"Sort Tasks"}
        />
        <MiniIconButton
          handleClick={() => setFilterMode(true)}
          iconName={"filter"}
          popupContent={"Filter Tasks"}
        />
        <MiniIconButton
          handleClick={() => setArchiveMode(true)}
          iconName={"archive"}
          popupContent={"Archive Tasks"}
        />
      </Button.Group>
    </div>
  );
};
const ProjectProgressBar = () => {
  const { projectTasks } = React.useContext(TasksContext);
  return (
    <Popup
      trigger={<ProgressBar items={projectTasks} />}
      flowing
      hoverable
      content="Here"
    />
  );
};

const SortOrderBreadcrumbs = ({ sortPropIndices }) => {
  const [sections, setSections] = React.useState([]);
  React.useEffect(() => {
    setSections(
      sortPropIndices.map((item) => sortOptions[item].formParams.name)
    );
  }, JSON.stringify(sortPropIndices));

  return (
    <StyledSortDisplay>
      {sections.map((section) => (
        <div>{section}</div>
      ))}
    </StyledSortDisplay>
  );
};

export default SideBarContainer;
