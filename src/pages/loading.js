import React from "react";
import { ContainerComponent, Loader } from "../components";

const Loading = React.memo(() => {
  return (
    <ContainerComponent>
      <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
      <Loader></Loader>
    </ContainerComponent>
  );
});

export default Loading;
