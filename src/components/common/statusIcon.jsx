import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import { taskStatuses } from "../../taskOptions";

export const StatusIcon = ({ taskStatus }) => {
  const { popupContent, color, iconName } = taskStatuses[taskStatus];
  return (
    <Popup
      content={popupContent}
      position="right center"
      trigger={<Icon size="large" name={iconName} color={color} />}
    />
  );
};
