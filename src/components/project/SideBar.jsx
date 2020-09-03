import React from "react";
import styled from "styled-components";
import {
  Popup,
  Icon,
  Button,
  Modal,
  Breadcrumb,
  Label,
} from "semantic-ui-react";
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
import filterOptions from "./filterOptions";
import FilterModal from "./FilterModal";

const StyledSortDisplay = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-color: #777;
  margin: 1em 0;
`;
const SideBarContainer = ({ project }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [addGroupMode, setAddGroupMode] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [sortMode, setSortMode] = React.useState(false);
  const [filterMode, setFilterMode] = React.useState(false);
  const [archiveMode, setArchiveMode] = React.useState(false);
  const [sortProps, setSortProps] = React.useState([sortOptions[0]]);
  const [filterProps, setFilterProps] = React.useState(
    JSON.parse(JSON.stringify(filterOptions))
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
    sortProps,
    filterProps,
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
    setSortProps,
    setFilterProps,
  };
  return <SideBar state={state} setState={setState} />;
};
const SideBar = ({ state, setState }) => {
  const { project } = state;
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
      <ManagerProgressBar />
      <TaskOptionButtons setModes={setModes} />
      <SortOrderBreadcrumbs
        sections={state.sortProps.map((item) => item.name)}
      />
      <FilterTags filterProps={state.filterProps} />
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
  const { modes, project, sortProps, filterProps } = state;
  const { addGroupMode, editMode, deleteMode, sortMode, filterMode } = modes;
  const {
    setAddGroupMode,
    setEditMode,
    setDeleteMode,
    setSortMode,
    setFilterMode,
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
          sortProps={sortProps}
          setSortProps={setState.setSortProps}
        />
      )}
      {filterMode && (
        <FilterModal
          modalOpen={filterMode}
          closeModal={() => setFilterMode(false)}
          filterProps={filterProps}
          setFilterProps={setState.setFilterProps}
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
          popupContent={"Archive Selected Tasks"}
        />
      </Button.Group>
    </div>
  );
};
const ManagerProgressBar = () => {
  const { managerTasks } = React.useContext(TasksContext);
  return (
    <Popup
      trigger={
        <div>
          <ProgressBar items={managerTasks} />
        </div>
      }
      content="Completion of filtered tasks"
    />
  );
};

const SortOrderBreadcrumbs = ({ sections }) => {
  return (
    <StyledSortDisplay>
      <Popup
        content="Sorted By"
        trigger={
          <Label.Group circular inverted size="large">
            {sections.map((section, index) => {
              return index === sections.length - 1 ? (
                <Label content={section} />
              ) : (
                <React.Fragment>
                  <Label content={section} />
                  <Icon name="right angle" />
                </React.Fragment>
              );
            })}
          </Label.Group>
        }
      />
    </StyledSortDisplay>
  );
};

const FilterTags = ({ filterProps }) => {
  const activeFilters = filterProps.filter((prop) => prop.checked);
  return (
    <Popup
      content="Active Filters"
      trigger={
        <Label.Group size="large" tag>
          {activeFilters.map((filter) => (
            <Label tag>{filter.name}</Label>
          ))}
        </Label.Group>
      }
    />
  );
};

export default SideBarContainer;
