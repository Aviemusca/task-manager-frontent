import styled from "styled-components";

export const ProjectContainer = styled.div``;

export const ProjectHeader = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

export const ProjectTitle = styled.h1``;
export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
  grid-gap: 2em;
`;

export const SideBarContainer = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

export const SideBarTitle = styled.h2`
  width: 80%;
`;

export const Card = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

export const CardTitle = styled.h2`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 0.5em 0;
  border-bottom: solid 1px #bbb;
`;

export const CardSubTitle = styled.h4`
  text-color: #777;
`;

export const CardDescription = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 3em;
  justify-items: center;
`;
