import React from "react";
import styled from "styled-components";
import { Progress } from "semantic-ui-react";

const StyledProgressBar = styled(Progress)`
  & > .bar {
    background-color: rgba(${(props) => `${props.color}`}) !important;
  }
`;

const ProgressBarContainer = ({ items }) => {
  // Requires that items (array) have a state property (2 => complete)
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    setPercent(getPercent());
  }, [items.length, ...items.map((item) => item.state)]);

  const getPercent = () => {
    if (!items) return;
    let completed = 0;
    const total = items.length;
    items.forEach((item) => {
      if (item.state === 2) ++completed;
    });
    return ((completed / total) * 100).toFixed(1);
  };
  return <ProgressBar percent={percent} />;
};

const ProgressBar = ({ percent }) => {
  return <Progress percent={percent} progress indicating />;
};

export { ProgressBarContainer as ProgressBar, StyledProgressBar };
