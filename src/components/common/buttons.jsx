import React from "react";
import { Button, Icon, Popup } from "semantic-ui-react";

const MiniIconButton = ({
  popupContent,
  iconName,
  color,
  inverted,
  handleClick,
}) => {
  return (
    <Popup
      content={popupContent}
      trigger={
        <Button
          icon
          background="transparent"
          size="mini"
          onClick={handleClick}
          color={color}
          inverted={inverted}
        >
          <Icon name={iconName} />
        </Button>
      }
    />
  );
};

export { MiniIconButton };
