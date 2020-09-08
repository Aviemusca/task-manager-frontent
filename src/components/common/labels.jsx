import React from "react";
import { Segment, Label, Popup } from "semantic-ui-react";
import styled from "styled-components";

export const LabelBox = ({ title, children, bgColor }) => (
  <Segment style={{ backgroundColor: bgColor }}>
    <Label as="a" size="large" ribbon style={{ backgroundColor: "#25779540" }}>
      {title}
    </Label>
    <Label.Group circular size="big">
      {children}
    </Label.Group>
  </Segment>
);

export const NumberLabel = ({ popup, color, number }) => (
  <Popup
    content={popup}
    trigger={
      <Label color={color} as="a">
        {number}
      </Label>
    }
  />
);
