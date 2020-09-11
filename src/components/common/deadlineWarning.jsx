import React from "react";
import { Icon, Popup } from "semantic-ui-react";
import { taskDeadlines } from "../../taskOptions";

const DeadlineWarningContainer = ({ taskDeadline, taskStatus }) => {
  const [deadlineStatus, setDeadlineStatus] = React.useState(null);

  React.useEffect(() => {
    setDeadlineStatus(getDeadlineStatus());
  }, [taskDeadline, taskStatus]);

  const getDeadlineStatus = () => {
    const deadlineDate = new Date(taskDeadline);
    const currentDate = new Date();
    const difference = deadlineDate - currentDate;
    // Deadline has passed
    if (difference < 0) return 0;
    // 24 hours till deadline
    if (difference < 86400000) return 1;
    // 48 hours till deadline
    if (difference < 172800000) return 2;
    return null;
  };

  return (
    <React.Fragment>
      {deadlineStatus !== null && taskStatus !== 2 && (
        <DeadlineWarning deadlineStatus={deadlineStatus} />
      )}
    </React.Fragment>
  );
};

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

export default DeadlineWarningContainer;
