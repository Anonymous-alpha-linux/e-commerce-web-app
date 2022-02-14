import React from "react";
import { ContainerComponent } from "../../components";
import { PostContainer, Filter } from "../../containers";

export default function Workspace() {
  return (
    <ContainerComponent>
      <Filter></Filter>
      <PostContainer></PostContainer>
    </ContainerComponent>
  );
}
