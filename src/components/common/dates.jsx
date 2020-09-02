import React from "react";
import { Popup } from "semantic-ui-react";
import styled from "styled-components";

import { formatDistanceToNow, format as formatDate } from "date-fns";

const StyledDate = styled.div`
  color: #4c4cd5cc;
  margin: 0.5em 0;
`;

export const CardDates = ({ dateCreated, deadline }) => {
  return (
    <React.Fragment>
      <DateComponent title="Created" date={dateCreated} />
      <DateComponent title="Deadline" date={deadline} />
    </React.Fragment>
  );
};

export const DateComponent = ({ title, date }) => {
  const [dateObject, setDateObject] = React.useState(new Date(date));
  React.useEffect(() => setDateObject(new Date(date)), [date]);
  return (
    <Popup
      content={formatDate(dateObject, "PPPPpppp")}
      trigger={
        <StyledDate>
          {title} {formatDistanceToNow(dateObject, { addSuffix: true })}
        </StyledDate>
      }
    />
  );
};
