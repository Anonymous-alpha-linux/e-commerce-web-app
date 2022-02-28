import React from "react";
import { ContainerComponent } from "../components";
import { Loader } from '../containers'

const Loading = React.memo(() => {
  return (
    <ContainerComponent>
      <ContainerComponent.BackDrop>
        <ContainerComponent.Inner style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}>
          <Loader></Loader>
        </ContainerComponent.Inner>
      </ContainerComponent.BackDrop>
    </ContainerComponent>
  );
});

export default Loading;
