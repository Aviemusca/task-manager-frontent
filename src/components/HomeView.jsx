import React from "react";
import styled from "styled-components";
import { Container, Popup, List, Header } from "semantic-ui-react";
import { StyledCard, StyledColorBox } from "./common/styles";
import { LabelBox } from "./common/labels";
import { StatusIcon } from "./common/statusIcon";
import { DeadlineWarning } from "./common/deadlineWarning";
import { Task } from "./project/Task";
import { TaskModalClient } from "./project/TaskModal";
import {
  getPriorityColor,
  getDifficultyColor,
  getStateColor,
  taskStatuses,
  taskDeadlines,
} from "../taskOptions";
import { addHours } from "date-fns";

const initialTask = {
  title: "Multi-sorting algorithm",
  description:
    "Want to be able to sort tasks by a 1st property, then by 2nd property, 3rd etc...",
  dateCreated: new Date(),
  deadline: addHours(new Date(), 12),
  priority: 9,
  difficulty: 7,
  groupTitle: "Sorting and Filtering",
  state: 1,
};

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 6em;
  justify-items: start;
  align-items: center;
  margin-top: 6em;
  margin-bottom: 6em;
`;

const StyledListItem = styled(List.Item)`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const TaskIconsGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const StyledLabelBox = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Paragraph = styled.p`
  font-size: 1.1em;
`;
const ContentBox = styled(StyledCard)`
  margin-bottom: 1em;
`;
const HomeView = (props) => {
  return (
    <Container>
      <ContentBox>
        <ContentGrid>
          <Highlights />
        </ContentGrid>
      </ContentBox>
      <ContentGrid>
        <div>
          <ContentBox>
            <Paragraph>
              You can set priority and difficulty levels for a task, from 1 to
              10.
            </Paragraph>
            <Paragraph>
              You can also set deadlines and update the status or progress level
              of a task.
            </Paragraph>
          </ContentBox>

          <ContentBox>
            <Paragraph>
              Task priorities and difficulties are colour-coded.
            </Paragraph>
            <Paragraph>
              Statuses and approaching deadlines are indicated by coloured
              icons.
            </Paragraph>
            <Paragraph>
              Hover over them with your mouse to see what they mean.
            </Paragraph>
          </ContentBox>
        </div>
        <div>
          <StyledLabelBox>
            <ColorRangeBox
              title="Priorities"
              range={10}
              getColorFunc={getPriorityColor}
            />
          </StyledLabelBox>
          <StyledLabelBox>
            <ColorRangeBox
              title="Difficulties"
              range={10}
              getColorFunc={getDifficultyColor}
            />
          </StyledLabelBox>
          <StyledLabelBox>
            <StatusesBox />
          </StyledLabelBox>

          <StyledLabelBox>
            <DeadlinesBox />
          </StyledLabelBox>
        </div>
      </ContentGrid>
      <ContentGrid>
        <div>
          <ContentBox>
            <Paragraph>
              On the right, is a typical task where you can see the above icons
              in action.{" "}
            </Paragraph>
          </ContentBox>
          <ContentBox>
            <Paragraph>
              Click on the task to toggle between expanded and condensed forms.
            </Paragraph>
            <Paragraph>
              By holding the shift key while clicking, you can edit the task and
              check out how the colours and icons change!
            </Paragraph>
          </ContentBox>
        </div>
        <ContentBox>
          <TaskContainer />
        </ContentBox>
      </ContentGrid>
    </Container>
  );
};

const Highlights = () => (
  <div>
    <Header size="huge">Taskma</Header>
    <List bulleted>
      <StyledListItem>
        <h3>Create tasks, projects and task groups</h3>
      </StyledListItem>
      <StyledListItem>
        <h3>
          Set task statuses, priorities, difficulties and get deadline
          notifications
        </h3>
      </StyledListItem>
      <StyledListItem>
        <h3>Sort tasks over multiple properties simultaneously</h3>
      </StyledListItem>

      <StyledListItem>
        <h3>Combine sorting with filtering to target task sets</h3>
      </StyledListItem>
      <StyledListItem>
        <h3>Try Taskma on a mock project</h3>
      </StyledListItem>
      <StyledListItem>
        <h3>Sign up for free to create your own projects</h3>
      </StyledListItem>
    </List>
  </div>
);

const ColorRangeBox = ({ title, getColorFunc, range }) => (
  <LabelBox title={title}>
    {[...Array(range).keys()].map((item, index) => (
      <Popup
        content={`${index + 1}/${range}`}
        trigger={<StyledColorBox color={getColorFunc(index + 1)} />}
      />
    ))}
  </LabelBox>
);

const StatusesBox = () => (
  <LabelBox title="Statuses">
    {taskStatuses.map((status, id) => (
      <StatusIcon taskStatus={id} />
    ))}
  </LabelBox>
);

const DeadlinesBox = () => (
  <LabelBox title="Deadline Warnings">
    {taskDeadlines.reverse().map((deadline, id) => (
      <DeadlineWarning deadlineStatus={id} />
    ))}
  </LabelBox>
);

const TaskContainer = () => {
  const [task, setTask] = React.useState(initialTask);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const [priorityColor, setPriorityColor] = React.useState([]);
  const [stateColor, setStateColor] = React.useState([]);
  const [difficultyColor, setDifficultyColor] = React.useState([]);
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    setPriorityColor(getPriorityColor(task.priority));
  }, [task.priority]);

  React.useEffect(() => {
    setStateColor(getStateColor(task.state));
  }, [task.state]);

  React.useEffect(() => {
    setDifficultyColor(getDifficultyColor(task.difficulty));
  }, [task.difficulty]);

  const handleClick = (event) => {
    if (event.ctrlKey) setSelected(!selected);
    if (event.shiftKey) setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const state = {
    task,
    modalOpen,
    expanded,
    selected,
    colors: {
      priorityColor,
      difficultyColor,
      stateColor,
    },
  };
  const setState = {
    setTask,
    setExpanded,
    setModal: {
      setModalOpen,
      closeModal,
    },
    setColors: {
      setPriorityColor,
      setDifficultyColor,
      setStateColor,
    },
  };
  return (
    <div onClick={handleClick}>
      <Task
        state={state}
        setState={setState}
        modal={
          <TaskModalClient
            task={task}
            setTask={setTask}
            open={modalOpen}
            closeModal={closeModal}
          />
        }
      />
    </div>
  );
};
export default HomeView;
