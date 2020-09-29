import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Popup, List } from "semantic-ui-react";
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

import undraw from "../images/undraw.png";
import { Player } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";

import { addHours } from "date-fns";
import routes from "../routes";

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
  margin-bottom: 12em;
`;

const StyledListItem = styled(List.Item)`
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 1.3em;
  font-weight: 500;
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
  width: 90%;
`;
const ContentTitle = styled.h1`
  text-align: center;
  margin-top: 15em;
`;
const ImgWrapper = styled.img`
  width: 80%;
`;
const StyledSiteTitle = styled.h1`
  font-size: 3em;
  text-align: center;
  margin-bottom: 0.5em;
`;
const HomeView = (props) => {
  return (
    <Container>
      <Banner />
      <DemoVideo />
      <IconsSection />

      <TaskDemoSection />
    </Container>
  );
};
const Banner = () => (
  <ContentGrid style={{ marginTop: "12em" }}>
    <ContentBox>
      <HighlightsSection />
    </ContentBox>
    <ImgWrapper src={undraw} />
  </ContentGrid>
);
const HighlightsSection = () => (
  <div>
    <StyledSiteTitle>Taskma</StyledSiteTitle>
    <List bulleted>
      <StyledListItem>Manage your projects and tasks</StyledListItem>
      <StyledListItem>
        Set task statuses, priorities and difficulties
      </StyledListItem>
      <StyledListItem>Get deadline notifications</StyledListItem>
      <StyledListItem>
        Sort tasks over multiple properties simultaneously
      </StyledListItem>

      <StyledListItem>
        Combine sorting with filtering to target task sets
      </StyledListItem>
      <StyledListItem>
        <HashLink to="#demo-video">Get started</HashLink> today for free
      </StyledListItem>
    </List>
  </div>
);

const DemoVideo = () => (
  <React.Fragment>
    <ContentTitle id="demo-video">Demo Video</ContentTitle>
    <ContentGrid>
      <ContentBox>
        <Paragraph>
          Before you <Link to={routes.pages.signup}>sign up</Link>, check out
          the demo video to the right to get an idea of what this application
          does.
        </Paragraph>
        <Paragraph>
          Then make sure to read over the{" "}
          <HashLink to="#color-code-and-icons">color codes and icons</HashLink>{" "}
          section and play around with the{" "}
          <HashLink to="#example-task">example task.</HashLink>
        </Paragraph>
      </ContentBox>
      <video
        id="my-video"
        class="video-js"
        controls
        preload="auto"
        width="440"
        height="264"
        data-setup="{}"
      >
        <source src="videos/taskma.mp4" type="video/mp4" />
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </ContentGrid>
  </React.Fragment>
);
const IconsSection = () => (
  <React.Fragment>
    <ContentTitle id="color-code-and-icons">Color Codes and Icons</ContentTitle>
    <ContentGrid>
      <div>
        <ContentBox>
          <Paragraph>
            You can set priority and difficulty levels for a task, from 1 to 10.
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
            Statuses and approaching deadlines are indicated by coloured icons.
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
  </React.Fragment>
);

const TaskDemoSection = () => (
  <React.Fragment>
    <ContentTitle id="example-task">Example Task</ContentTitle>
    <ContentGrid>
      <div>
        <ContentBox>
          <Paragraph>
            On the right, is a typical task where you can see the above icons in
            action.{" "}
          </Paragraph>
        </ContentBox>
        <ContentBox>
          <Paragraph>
            Click on the task to toggle between expanded and condensed forms.
          </Paragraph>
          <Paragraph>
            <em>
              <strong>By holding the shift key</strong>
            </em>{" "}
            while clicking, you can edit the task and check out how the colours
            and icons change!
          </Paragraph>
        </ContentBox>
      </div>
      <ContentBox>
        <TaskContainer />
      </ContentBox>
    </ContentGrid>
  </React.Fragment>
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
    {[...taskDeadlines].reverse().map((deadline, id) => (
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
