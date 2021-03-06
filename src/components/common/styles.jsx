import styled from "styled-components";
import { Label } from "semantic-ui-react";

export const CustomFormContainerSm = styled.div`
  width: 40%;
  border-radius: 5px;
  border: solid 1px #ddd;
  margin: 5em auto;
  padding: 1.5em 3em;
  background-color: var(--form-container-color);
`;
export const CustomFormContainerMd = styled.div`
  width: 60%;
  border-radius: 5px;
  border: solid 1px #ddd;
  margin: 5em auto;
  padding: 1.5em 3em;
  background-color: var(--form-container-color);
`;
export const CustomFormContainerLg = styled.div`
  width: 80%;
  border-radius: 5px;
  border: solid 1px #ddd;
  margin: 5em auto;
  padding: 1.5em 3em;
  background-color: var(--form-container-color);
`;
export const CustomForm = styled.form`
  width: 100%;
  padding-bottom: 2em;
  border-bottom: solid 1px #ddd;
`;
export const CustomFormTitle = styled.h1`
  text-align: center;
  margin-bottom: 0.75em;
  padding-bottom: 0.25em;
  border-bottom: solid 1px #ddd;
`;

export const CustomFormFooter = styled.p`
  margin-top: 0.25em;
  color: #777;
`;

export const CustomFormSubText = styled.p`
  margin-top: 0.25em;
  color: #777;
`;

export const StyledCard = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
  padding: 1em 1.5em;
  &:hover {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3),
      6px 6px 6px 6px rgba(0, 0, 0, 0.19);
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 0.5em;
  border-bottom: solid 1px #bbb;
`;

export const StyledTitle = styled.h2`
  width: 60%;
  margin-bottom: 0;
`;

export const StyledTableTitle = styled.h2`
  text-align: center;
  font-weight: 900;
  width: 25%;
  margin: 1em auto;
`;

export const StyledLabel = styled(Label)`
  &&& > .label {
    color: green !important;
  }
`;

export const StyledColorBox = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  border-radius: 25px;
  border: solid 1px #777;
  background: rgba(${(props) => `${props.color}`});
`;
