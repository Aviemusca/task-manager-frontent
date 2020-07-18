import React from "react";
import { Card, CardTitle, CardSubTitle, CardDescription } from "./Styles";

import routes from "../../routes";

const GroupCard = ({ group }) => {
  const { title, dateCreated, description } = group;
  return (
    <Card>
      <CardTitle>{title}</CardTitle>

      <CardSubTitle>{dateCreated}</CardSubTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
};

export default GroupCard;
