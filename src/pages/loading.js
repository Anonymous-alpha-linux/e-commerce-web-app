import React from "react";
import { ContainerComponent } from "../components";
import { Loader } from '../containers'

const Loading = React.memo(() => {
  return (
    <ContainerComponent>
      <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
      <Loader></Loader>
    </ContainerComponent>
  );
});

export default Loading;
