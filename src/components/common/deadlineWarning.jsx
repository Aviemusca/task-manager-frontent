import React from "react";
import { Icon, Popup } from "semantic-ui-react";
import { taskDeadlines } from "../../taskOptions";

export const DeadlineWarning = ({ deadlineStatus }) => {
  return (
    <Popup
      content={taskDeadlines[deadlineStatus].popupContent}
      position="right center"
      trigger={
        <Icon
          color={taskDeadlines[deadlineStatus].color}
          name="warning sign"
          size="large"
        />
      }
    />
  );
};
